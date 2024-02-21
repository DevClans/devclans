import colors from "@/lib/colors";
import { ButtonBlue } from "..";
import { FilePlus2 } from "lucide-react";
import MessageWithButton from "./MessageWithButton";

const CreateNewProject = () => {
  return (
    <MessageWithButton
      heading="Want to make your skills known to fellow devs?"
      desc="Start by creating a project."
      button={
        <ButtonBlue
          icon={
            <FilePlus2 className="ml-1" size={16} color={colors.highlight} />
          }
          className="cardGrad lg:max-w-[200px]"
          href="/project/new"
          label="Create New Project"
        />
      }
    />
  );
};

export default CreateNewProject;
