import { UserProps } from "@/types/mongo/user.types";
export const discordImgUrl = (
  userid: string,
  avatar: string,
  size?: number
) => {
  if (!userid || !avatar) return "";
  return (
    `https://cdn.discordapp.com/avatars/${userid}/${avatar}.png` +
    (size ? `?size=${size}` : "")
  );
};
const userAvatar = async ({
  avatar,
  discordImg,
  gitubImg,
  userProps,
  discordId,
  discordSize,
}: {
  avatar?: string;
  discordImg?: string | null;
  gitubImg?: string | null;
  userProps?: Partial<UserProps>;
  discordId?: string;
  discordSize?: number;
}): Promise<string> => {
  const avtr = avatar || userProps?.avatar;
  const dId = discordId || userProps?.discordDetails?._id;
  const dc = discordImg || userProps?.discordDetails?.avatar;
  const gh = gitubImg || userProps?.githubDetails?.avatar_url;
  let res = "";
  if (avtr && avtr.startsWith("https")) res = avtr;
  else if (dc && dId) res = discordImgUrl(dId || "", dc || "", discordSize);
  else if (dc && dc.startsWith("https")) res = dc;
  else if (gh && gh.startsWith("https")) res = gh;
  if (res.startsWith("https")) return res;
  return "/" + res;
};

export default userAvatar;
