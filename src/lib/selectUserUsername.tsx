import { UserProps } from "@/types/mongo/user.types";

const selectUserUsername = ({
  username,
  discordUsername,
  gitUsername,
  userProps,
}: {
  username?: string;
  discordUsername?: string;
  gitUsername?: string;
  userProps?: Partial<UserProps>;
}): string => {
  const avtr = username || userProps?.username;
  const dc =
    discordUsername ||
    userProps?.discordDetails?.global_name ||
    userProps?.discordDetails?.username;
  const gh = gitUsername || userProps?.githubDetails?.username;
  let res = "";
  if (avtr) res = avtr;
  else if (dc) res = dc;
  else if (gh) res = gh;
  return res;
};

export default selectUserUsername;
