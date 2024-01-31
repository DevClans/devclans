import { UserProps } from "@/types/mongo/user.types";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
const discordImgUrl = (userid: string, avatar: string) => {
  if (!userid || !avatar) return "";
  return `https://cdn.discordapp.com/avatars/${userid}/${avatar}.png`;
};
const userAvatar = async ({
  avatar,
  discordImg,
  gitubImg,
  userProps,
}: {
  avatar?: string;
  discordImg?: string;
  gitubImg?: string;
  userProps?: Partial<UserProps>;
}): Promise<string> => {
  const session = getServerSessionForServer();
  if (session) {
    const userd: any = (await session)?.user;
    const url = discordImgUrl(userd?.discordId || "", userd?.avatar || "");
    if (url) return url;
  }
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
