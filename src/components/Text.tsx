import { TextProps, textClasses } from "@/types/text.types";

const Text = ({
  type,
  textClass,
  textStyle,
  color,
  text,
  textTransform,
  textAlign,
  children,
  ...props
}: TextProps) => {
  const txt = text || children;
  const classs = `${type && textClasses[type]} ${textClass}`;
  const stylee = { textAlign, textTransform, ...props, ...textStyle };
  return (
    <p className={classs} style={stylee}>
      {txt}
    </p>
  );
};

export default Text;
