import { ButtonProps } from "@/types";
import ButtonLink from "./ButtonLink";
import { selectIconForLinks } from "@/lib/socialIcons";

const ButtonNormal = ({ className, ...props }: Partial<ButtonProps>) => {
  return (
    <ButtonLink
    {...props}
    className={
        "flex-shrink-0 z-50 bg-cfDark py-2 px-3 left-[50%] group -translate-x-1/2 !text-white shadow-lg fixed bottom-[50px] lg:bottom-[35px] justify-self-center w-max transition-[transform,shadow,background-color] hover:transition-[transform,shadow,background-color] duration-300 hover:-translate-y-2 active:translate-y-0 rounded-[10px] hover:!opacity-100 hover:shadow-2xl active:shadow-none " +
        className
    }
    label="Create Your Devlink"
    href="/"
    />
  );
};

export default ButtonNormal;
