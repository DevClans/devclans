import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongoose.config";
import { ProjectProps, ProjectRedisKeys } from "@/types/mongo/project.types";
import redisClient from "@/redis/config";
import stringify from "fast-json-stable-stringify";
import { zodFilterQuery } from "@/zod/zod.common";
import type { FilterQuery } from "@/types/filter.types";
import { mongoProjects } from "./mongoGetProjects";
import { getSearchParams } from "./getSearchParams";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";

async function handler(req: Request, type: "projects" | "users" = "projects") {
  const isProject = type === "projects";
  const Enum = isProject ? ProjectRedisKeys : UserRedisKeys;
  type Props = typeof isProject extends true ? ProjectProps : UserProps;
  try {
    await dbConnect();
    // Assuming you have query parameters for search, page, filters
    const { search, page, filters }: FilterQuery = zodFilterQuery.parse(
      getSearchParams(req.url)
    );
    console.log(search, page, filters, "search, page, filters");
    // Generating a unique key for each search combination
    const searchKey = `${Enum.search}:${search}:${stringify(
      Array.isArray(filters) ? filters : Object.entries(filters)
    )}:${page}`;

    // Check if the result is already in the cache
    const zcache = await redisClient.zrange(searchKey, 0, -1);
    const cachedProjectIds = zcache[0] == "0" ? [] : zcache;

    console.log(cachedProjectIds, "cachedProjectIds");
    const cacheData: string[] = [];
    const resData: Props[] = [];
    let dbData: Props[] = [];
    if (cachedProjectIds.length > 0) {
      console.log("getting projects from cache");
      // If found in cache, get the data from cache
      Array.prototype.push.apply(
        cacheData,
        await redisClient.hmget(Enum.list, ...cachedProjectIds)
      );
      // Collecting IDs not found in cache
      const idsNotInCache = [];
      for (let i = 0; i < cacheData.length; i++) {
        if (cacheData[i] === null) {
          idsNotInCache.push(cachedProjectIds[i]);
        } else {
          resData[i] = JSON.parse(cacheData[i] as string);
        }
      }
      if (idsNotInCache.length === 0) {
        // If all the data is found in cache, return the data
        console.log("Sending projects successfully from cache");
        return NextResponse.json(resData);
      }
      console.log("getting idsNotInCache", idsNotInCache);
      // If some data is not found in cache, get the data from database
      dbData = (await mongoProjects(
        { _id: { $in: idsNotInCache } },
        page,
        search,
        filters,
        type
      )) as Props[];
    } else {
      console.log("getting projects from database");
      // If not found in cache, get the data from database
      dbData = (await mongoProjects(
        {},
        page,
        search,
        filters,
        type
      )) as Props[];
    }
    // * STORING DATA IN CACHE
    const dataIdsForCache = [];
    for (let i = 0; i < dbData.length; i++) {
      dataIdsForCache.push(i); // score
      dataIdsForCache.push(dbData[i]._id?.toString()); // value
    }
    console.log("dataIdsForCache", dataIdsForCache);
    // adding data to projectsData
    Array.prototype.push.apply(resData, dbData);
    // Storing the data in cache
    // if (dataIdsForCache.length > 0) {
    console.log("Storing projects in cache");
    // storing ids in sorting set
    await redisClient.zadd(
      searchKey,
      ...(dataIdsForCache.length > 0 ? dataIdsForCache : ([0, 0] as any))
    ); //zadd(key, score1, member1, score2, member2, ...)
    redisClient.expire(searchKey, 60 * 60 * 24 * 7); // 1 week
    // storing data in projects hash
    if (dataIdsForCache.length > 0) {
      redisClient.hmset(
        Enum.list,
        dbData.reduce(
          (acc, curr) => ({
            ...acc,
            [curr._id?.toString() as string]: JSON.stringify(curr),
          }),
          {}
        )
      );
    }
    // }
    console.log("Sending projects successfully");
    return NextResponse.json(resData);
  } catch (error: any) {
    console.log(error, "in project route");
    return NextResponse.json({ error: error.message });
  }
}

export { handler as getDataQuery };

// algorithm
// get search query, page, filters from url
// check cache for projects searches
// if found, get projects search data from cache
// collect ids not found in cache
// check count
// if count is less or not found, get from database
// store in cache
// {$and:[{
// $or:[{username:{"$regex":"dummy","$options":"i"}}]},{skills:{$in:["javascript"]}}]}
