import { FetchProjectProps } from "@/types/fetch.types";
import {
  ProjectProps,
  ProjectRepoDetailsProps,
} from "@/types/mongo/project.types";
import { Fetch } from "@/utils/fetchApi";

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProjectData = async (projectId: string) => {
  const fetchData = async (): Promise<ProjectProps | null> => {
    // Function body
    try {
      const res = await Fetch({
        endpoint: `/project/${projectId}`,
        method: "GET",
      });
      const { data, message } = res || {};
      // console.log("data", data, message);
      if (message) {
        throw new Error(message);
      }
      return data;
    } catch (error) {
      console.error("Error fetching project details:", error);
      return null;
    }
  };

  const projectData = (await fetchData()) as ProjectProps;

  const renderLanguages = () => {
    if (!projectData?.repoDetails?.languages) {
      return [];
    }

    const languagesObject = projectData.repoDetails.languages;
    const totalBytes: any = Object.values(languagesObject).reduce(
      (acc: any, percentage: any) => acc + percentage,
      0
    );

    const languages = Object.entries(languagesObject).map(
      ([language, percentage]: any) => ({
        name: language,
        percentage: (percentage / totalBytes) * 100,
        color: getRandomColor(), // Assuming you have a function to generate random colors
      })
    );

    return languages;
  };
  const languages: ProjectRepoDetailsProps["languages"] = renderLanguages();
  return {
    projectData,
    renderLanguages: languages,
  };
};

export default ProjectData;
// <div>
//   <h2 className="text-lg font-semibold mb-2">Languages Used</h2>
//   <div className="flex flex-col space-y-2">
//     <div className="flex items-center space-x-2">
//       {languages.map(({ name, percentage, color }) => (
//         <div
//           key={name}
//           className="flex-grow bg-green-400 h-6 rounded-md"
//           style={{ width: `${percentage}%`, backgroundColor: color }}
//         ></div>
//       ))}
//     </div>
//     <div className="flex space-x-2">
//       {languages.map(({ name, percentage }) => (
//         <div key={name} className="text-sm font-medium">
//           {name} ({Number(percentage).toFixed(2)}%)
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
// );
