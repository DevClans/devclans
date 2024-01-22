import { UserProps } from "@/types/mongo/user.types";

const userAvatar = ({
  avatar,
  discordImg,
  gitubImg,
  userProps,
}: {
  avatar?: string;
  discordImg?: string;
  gitubImg?: string;
  userProps?: Partial<UserProps>;
}): string => {
  const avtr = avatar || userProps?.avatar;
  const dc = discordImg || userProps?.discordDetails?.avatar;
  const gh = gitubImg || userProps?.githubDetails?.avatar_url;
  let res = "";
  if (avtr && avtr.startsWith("https")) res = avtr;
  else if (dc && dc.startsWith("https")) res = dc;
  else if (gh && gh.startsWith("https")) res = gh;
  if (res.startsWith("https")) return res;
  return "/" + res;
};

export default userAvatar;
