export const projectDomains = [
  "Android",
  "Web",
  "iOS",
  "ML",
  "AR/VR",
  "Game Dev",
  "Blockchain",
  "Cloud",
  "Security",
  "Data Science",
  "Open Source",
  "Competitive Programming",
  "Hardware",
  "UI/UX",
  "DSA",
  "System Design",
] as const;

export type ProjectDomainType = (typeof projectDomains)[number];
