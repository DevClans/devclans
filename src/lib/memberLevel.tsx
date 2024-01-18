export const memberLevelsMap = {
  beginner: true,
  intermediate: true,
  advanced: true,
  expert: true,
  master: true,
  grandmaster: true,
  legend: true,
  god: true,
};

export const memberLevels = [...Object.keys(memberLevelsMap), null];

export type MemberLevelType = keyof typeof memberLevelsMap | null;
