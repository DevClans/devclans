import { urlApi } from "@/constants";
import { FetchProjectProps } from "@/types/fetch.types";

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
  const fetchData = async (): Promise<FetchProjectProps | null> => {
    // Function body
    try {
      const response = await fetch(urlApi + `/project/${projectId}`, {
        cache: "no-store",
      });
      const data: FetchProjectProps = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching project details:", error);
      return null;
    }
  };

  const projectData = await fetchData();

  const renderLanguages = () => {
    if (!(projectData && (projectData as { languages: any }).languages)) {
      return null;
    }

    const languagesObject = (projectData as { languages: any }).languages;
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

  return {
    projectData,
    renderLanguages,
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
