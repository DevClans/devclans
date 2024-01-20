const selectUserUsername = (
  avatar?: string,
  discordImg?: string,
  gitubImg?: string
): string => {
  if (avatar) return avatar;
  if (discordImg) return discordImg;
  if (gitubImg) return gitubImg;
  return "";
};

export default selectUserUsername;
