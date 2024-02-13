import { ProjectModel, UserModel } from "@/mongodb/models";
import { projectSearchItemKeys } from "@/types/mongo/project.types";
import { mongoFilter } from "./mongoFilter";
import { userSearchInfoKeys } from "@/types/mongo/user.types";

export const mongoProjects = async ({
  filterQuery = {},
  find = {},
  search,
  page = 1,
  type = "projects",
}: {
  find: any;
  page?: number;
  search?: string;
  filterQuery?: Record<string, any>;
  type?: "projects" | "users";
}) => {
  const model = type == "projects" ? ProjectModel : UserModel;
  try {
    const andCond = mongoFilter(search, filterQuery, type);
    const query = { ...find, ...andCond };
    // to get only published projects
    if (type == "projects") {
      query["published"] = true;
    }
    console.log("mongo query", JSON.stringify(query));
    const dbData = await model
      .find(query)
      .select(
        model == ProjectModel
          ? projectSearchItemKeys.join(" ")
          : userSearchInfoKeys.join(" ")
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .lean();
    return dbData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
