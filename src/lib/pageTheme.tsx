export const pageThemeMap = {
    dark: true,
    light: true,
    vibrant: true,
    odysessy: true,
  };

  
export const pageTheme = [...Object.keys(pageThemeMap), ""] as const;

export type PageThemeType = keyof typeof pageThemeMap | null;