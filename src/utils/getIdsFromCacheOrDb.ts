import { ProjectProps, ProjectRedisKeys } from "@/types/mongo/project.types";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";
import { mongoProjects } from "./mongoGetProjects";
import { redisGetMany, redisSetMany } from "@/redis/basicRedis";

const getIdsFromCacheOrDb = async ({
  idsToGet,
  type = "projects",
  page,
  search,
  find,
  filterQuery,
  getProjectsFromDb = true,
}: {
  idsToGet: string[];
  type?: "projects" | "users";
  find?: any;
  page?: number;
  search?: string;
  filterQuery?: Record<string, any>;
  getProjectsFromDb?: boolean;
}) => {
  const findProjectIds =
    idsToGet.length == 1 && idsToGet[0] == "0"
      ? "none"
      : idsToGet[0] == "0"
      ? idsToGet.slice(1)
      : idsToGet;
  if (findProjectIds == "none")
    return { dbData: [], resData: [], idsToBeStoredInCache: [] };
  const resData: Props[] = [];
  const idsToBeStoredInCache: (string | number)[] = []; // ids to be stored in cache
  let dbData: Props[] = [];
  const isProject = type === "projects";
  const Enum = isProject ? ProjectRedisKeys : UserRedisKeys;
  type Props = typeof isProject extends true ? ProjectProps : UserProps;
  if (findProjectIds.length > 0) {
    console.log("getting projects from cache");
    // If found in cache, get the data from cache
    const { found, notFound } = await redisGetMany(Enum.list, findProjectIds);
    Array.prototype.push.apply(resData, found);

    if (notFound.length === 0) {
      // If all the data is found in cache, return the data
      console.log("Sending projects successfully from cache");
      return {
        dbData,
        resData,
        idsToBeStoredInCache,
      };
    }
    console.log("getting notFound", notFound);
    // If some data is not found in cache, get the data from database
    dbData = (await mongoProjects({
      find: { _id: { $in: notFound } },
      type,
      page,
      search,
      filterQuery,
    })) as Props[];
  } else {
    if (getProjectsFromDb === false) {
      // if we enter this block, it means that the idsToGet is empty so nothing to store in cache
      return { dbData: [], resData: [], idsToBeStoredInCache: [] };
    }
    console.log("getting projects from database");
    // If not found in cache, get the data from database
    dbData = (await mongoProjects({
      find: find || {},
      type,
      page,
      search,
      filterQuery,
    })) as Props[];
  }

  // * STORING DATA IN CACHE
  for (let i = 0; i < dbData.length; i++) {
    idsToBeStoredInCache.push(i); // score
    idsToBeStoredInCache.push(dbData[i]._id?.toString()); // value
  }
  console.log("dataIdsForCache", idsToBeStoredInCache);
  // adding data to projectsData
  Array.prototype.push.apply(resData, dbData);
  // storing data in projects hash
  if (idsToBeStoredInCache.length > 0) {
    await redisSetMany(
      Enum.list,
      dbData.map((project) => [project._id?.toString() as string, project])
    );
  }

  return {
    dbData,
    resData,
    idsToBeStoredInCache,
  };
};

export default getIdsFromCacheOrDb;
