import { ProjectFilesProps, ProjectProps } from "./mongo/project.types";

export type FetchProjectProps = {
  data: ProjectProps;
  files: ProjectFilesProps;
  languages: Record<string, number>;
};
