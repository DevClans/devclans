import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongoose.config";
import { ProjectProps, ProjectRedisKeys } from "@/types/mongo/project.types";
import redisClient from "@/redis/config";
import stringify from "fast-json-stable-stringify";
import { zodFilterQuery } from "@/zod/zod.common";
import type { FilterQuery } from "@/types/filter.types";
import { getSearchParams } from "./getSearchParams";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";
import getIdsFromCacheOrDb from "./getIdsFromCacheOrDb";

export async function getDataQuery(
  url: string,
  type: "projects" | "users" = "projects"
) {
  if (!url) {
    return NextResponse.json({ error: "no request" });
  }
  const isProject = type === "projects";
  const Enum = isProject ? ProjectRedisKeys : UserRedisKeys;
  type Props = typeof isProject extends true ? ProjectProps : UserProps;
  try {
    await dbConnect();
    // Assuming you have query parameters for search, page, filters
    const { search, page, filters }: FilterQuery = zodFilterQuery.parse(
      getSearchParams(url)
    );
    console.log(search, page, filters, "search, page, filters");
    // Generating a unique key for each search combination
    const searchKey = `${Enum.search}:${search}:${stringify(
      Array.isArray(filters) ? filters : Object.entries(filters)
    )}:${page}`;

    // Check if the result is already in the cache
    const zcache = await redisClient.zrange(searchKey, 0, -1);
    const cachedProjectIds =
      zcache.length == 1 && zcache[0] == "0" ? "none" : zcache;
    if (cachedProjectIds == "none") {
      console.log("No projects found in cache", zcache, searchKey);
      return NextResponse.json({ error: "no projects found" });
    }
    console.log(cachedProjectIds, "cachedProjectIds");
    const { resData, idsToBeStoredInCache } = await getIdsFromCacheOrDb({
      idsToGet: cachedProjectIds,
      type,
      page,
      search,
      filterQuery: filters,
    });
    // Storing the data in cache
    // if (dataIdsForCache.length > 0) {

    console.log("Storing projects in cache");
    // storing ids in sorting set
    await redisClient.zadd(
      searchKey,
      ...(idsToBeStoredInCache.length > 0
        ? idsToBeStoredInCache
        : ([0, 0] as any))
    ); //zadd(key, score1, member1, score2, member2, ...)
    redisClient.expire(searchKey, 60 * 60 * 24 * 1); // 1 day
    // }
    console.log("Sending projects successfully");
    return NextResponse.json(resData);
  } catch (error: any) {
    console.log(error, "in project route");
    return NextResponse.json({ error: error.message });
  }
}

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
