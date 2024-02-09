import colors from "@/lib/colors";
import { ButtonBlue } from "..";
import { FilePlus2 } from "lucide-react";

const CreateNewProject = () => {
  return (
    <div className="cardCommon flex flex-col items-start lg:flex-row lg:items-end lg:justify-between  gap-3">
      <div className="gap-1 fcfs">
        <h3>Want to make your skills known to fellow devs?</h3>
        <p>Start by creating a project.</p>
      </div>
      <ButtonBlue
        icon={<FilePlus2 className="ml-1" size={16} color={colors.highlight} />}
        className="cardGrad lg:max-w-[200px]"
        href="/project/new"
        label="Create New Project"
      />
    </div>
  );
};

export default CreateNewProject;
