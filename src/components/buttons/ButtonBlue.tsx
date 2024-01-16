import { ButtonProps } from "@/types";

const ButtonBlue = ({ style, className, label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={(e) => onClick && onClick(e, label)}
      className={"bg-primary w100 h-[50px] rounded-[10px] " + className}
      style={style}
    >
      {label}
    </button>
  );
};

export default ButtonBlue;
