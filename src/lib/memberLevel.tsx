export const memberLevelsMap = {
  beginner: true,
  intermediate: true,
  advanced: true,
};

export const memberLevels = [...Object.keys(memberLevelsMap), ""] as const;

export type MemberLevelType = keyof typeof memberLevelsMap | null;
