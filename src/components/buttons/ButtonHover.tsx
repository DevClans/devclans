import { ButtonProps } from "@/types";
import ButtonLink from "./ButtonLink";
import { selectIconForLinks } from "@/lib/socialIcons";

const ButtonHover = ({ className, ...props }: Partial<ButtonProps>) => {
  return (
    <ButtonLink
      {...props}
      className={
        "flex-shrink-0 z-50 bg-white py-2 px-3 left-[50%] group -translate-x-1/2 !text-cfDark hover:!text-white shadow-lg fixed bottom-[50px] lg:bottom-[35px] justify-self-center w-max transition-[transform,shadow,background-color] hover:transition-[transform,shadow,background-color] duration-300 hover:-translate-y-2 active:translate-y-0 hover:bg-cfDark rounded-[10px] hover:!opacity-100 hover:shadow-2xl active:shadow-none " +
        className
      }
      label="Create Your Devlink"
      href="/"
      icon={selectIconForLinks("devclans", undefined, false, {
        className:
          "h-[16px] w-[16px] invert group-hover:invert-0 transition-[invert] hover:transition-[invert] duration-300 ease-in-out",
      })}
    />
  );
};

export default ButtonHover;
