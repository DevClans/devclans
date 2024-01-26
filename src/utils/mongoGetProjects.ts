import { ProjectModel, UserModel } from "@/mongodb/models";
import { projectSearchItemKeys } from "@/types/mongo/project.types";
import { mongoFilter } from "./mongoFilter";
import { userSearchInfoKeys } from "@/types/mongo/user.types";

export const mongoProjects = async (
  find: any = {},
  page: number = 1,
  search: string,
  filterQuery: Record<string, any>,
  type: "projects" | "users" = "projects"
) => {
  const model = type == "projects" ? ProjectModel : UserModel;
  try {
    const andCond = mongoFilter(search, filterQuery, type);
    const query = { ...find, ...andCond };
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
