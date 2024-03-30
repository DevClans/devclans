"use client";
import { ButtonProps } from "@/types";
import ButtonLink from "../buttons/ButtonLink";

const IconWithBg = ({
  children,
  icon,
  className,
  ...rest
}: React.PropsWithChildren & Partial<ButtonProps>) => {
  return (
    <ButtonLink
      className={`p-[10px] cardGrad rounded-[5px] ` + className}
      label={icon || children}
      {...rest}
    />
  );
};

export default IconWithBg;
