import { ButtonProps } from "@/types";
import ButtonLink from "./ButtonLink";

const ButtonUserSection = ({
  className,
  style,
  active,
  label,
  activeLabel,
  ...props
}: ButtonProps) => {
  const styles: React.CSSProperties = {};
  if (!active) {
    styles["background"] = "rgba(8, 17, 33, 0.12)";
    styles["boxShadow"] =
      "0px 4px 5.3px 0px rgba(20, 26, 37, 0.20) inset, 0px -4px 3px 0px rgba(6, 12, 24, 0.10) inset";
  }
  return (
    <>
      <ButtonLink
        label={
          active ? (
            <>
              <span className="rounded-[20px] px-1 bg-subH text-bg mr-1">
                {label}
              </span>
              {activeLabel || "Learn More"}
            </>
          ) : (
            label
          )
        }
        className={`border-border frc border !font-medium rounded-[20px] px-3 py-1 text-sm backdrop-filter-[27px] ${className} ${
          active && "!text-subH pl-1 pr-2"
        }`}
        style={{
          ...style,
        }}
        {...props}
      />
    </>
  );
};

export default ButtonUserSection;
