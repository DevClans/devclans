import { ButtonProps } from "@/types";
import { ButtonBlue } from "..";

const MessageWithButton = ({
  heading,
  desc,
  button,
  icon,
  pClass,
  buttonProps,
}: {
  button: string | React.ReactNode;
  heading: string;
  desc: string;
  pClass?: string;
  icon?: React.ReactNode;
  buttonProps?: Partial<ButtonProps>;
}) => {
  return (
    <div className="cardCommon flex flex-col items-start lg:flex-row lg:items-center lg:justify-between  gap-7">
      <div className="gap-1 fcfs">
        <h3>{heading}</h3>
        <p className={pClass}> {desc}</p>
      </div>
      {typeof button == "string" ? (
        <ButtonBlue
          icon={icon}
          className="cardGrad lg:max-w-[200px]"
          label={button as string}
          {...buttonProps}
        />
      ) : (
        button
      )}
    </div>
  );
};

export default MessageWithButton;
