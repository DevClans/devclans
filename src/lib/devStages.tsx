import colors from "./colors";

export const devStagesColors = {
  idea: colors.yellowDark,
  development: "#3E75E3",
  alpha: "#284F9C",
  beta: "#596B91",
  production: "#081121",
};

export const devStages = Object.keys(devStagesColors);

// Generate enum based on keys of devStagesColors
export type DevStagesType = keyof typeof devStagesColors;
