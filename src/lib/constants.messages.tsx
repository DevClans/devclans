export const msgLookingForMember = (username: string, level: string) =>
  `${username} is looking for a ${level} is join their team. Visit link to explore`;
export const msgSharingUser = (username: string) =>
  `Check out ${username ? username + "'s" : "engaging"} profile on Devclans`;
export const msgSharingProject = (title: string) =>
  `Check out ${title || "this awesome project"} on Devclans`;
