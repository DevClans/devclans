const userAvatar = (
  avatar?: string,
  discordImg?: string,
  gitubImg?: string
): string => {
  let res = "";
  if (avatar) res = avatar;
  else if (discordImg) res = discordImg;
  else if (gitubImg) res = gitubImg;
  if (res.startsWith("http")) return res;
  return "/" + res;
};

export default userAvatar;
