import colors from "@/lib/colors";
import IconDevelop from "../icons/IconDevelop";
import { DevStagesType } from "@/lib/devStages";

const ProjectStage = ({
  stage,
  color,
  icon,
}: {
  color?: string;
  stage?: DevStagesType;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className="frc"
      style={{
        borderRadius: "10px 10px 0px 10px",
        border: "1px solid var(--border, #132341)",
        background: color || colors.yellowDark,
        padding: "5px 9px",
        color: colors.border,
        fontSize: 11,
        fontWeight: 500,
        lineHeight: "13px",
        gap: "8px",
        textTransform: "capitalize",
      }}
    >
      {icon || <IconDevelop color={colors.border} size={16} />}
      {stage || "Development Stage"}
    </div>
  );
};

export default ProjectStage;
