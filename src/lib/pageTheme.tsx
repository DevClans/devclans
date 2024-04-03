export const pageThemeMap = {
  notebook: true,
  lunar: true,
  chroma: true,
};

export const pageTheme = ["", ...Object.keys(pageThemeMap)] as const;

export type PageThemeType = keyof typeof pageThemeMap | null;
