export const typeTextClass2 = {
  h1e: "text-[64px] expose upper",
  h2e: "text-4xl expose upper",
  h3e: "text-[22px] expose upper",
};

export const textClasses = {
  h1: "semi text-[64px]",
  h2: "semi text-4xl",
  h3: "semi text-[22px]",
  semi12: "semi12",
  semi14: "semi14",
  semi16: "semi16",
  semi18: "semi text-[18px]",
  medi10: "medi text-[10px]",
  medi12: "medi12",
  medi14: "medi14",
  medi16: "medi16",
  medi22: "medi text-[22px]",
  regu14: "regu14",
  ...typeTextClass2,
};
type FontWeightType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontSizeType = 12 | 14 | 16 | 18 | 22 | 36 | 56 | 64;
export type TypeTextClass = keyof typeof textClasses;
type TypeTextTransform = "uppercase" | "capitalize" | "none" | undefined;
export type TextProps = {
  type?: TypeTextClass;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  textClass?: string;
  textStyle?: React.CSSProperties;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
  textTransform?: TypeTextTransform;
  color?: string;
} & (
  | {
      children: React.ReactNode;
      text?: undefined;
    }
  | {
      children?: React.ReactNode;
      text: string;
    }
);
