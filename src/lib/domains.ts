export const projectDomains = [
  "android",
  "web",
  "ios",
  "ml",
  "ar/vr",
  "game dev",
  "blockchain",
  "cloud",
  "security",
  "data science",
  "open source",
  "competitive programming",
  "hardware",
  "ui/ux",
  "dsa",
  "system design",
] as const;

export type ProjectDomainType = (typeof projectDomains)[number];
