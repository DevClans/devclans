import { UserProps } from "@/types/mongo/user.types";

const selectUserDisplayName = ({
  username,
  discordUsername,
  userProps,
}: {
  username?: string;
  discordUsername?: string;
  userProps?: Partial<UserProps>;
}): string => {
  return (
    userProps?.discordDetails?.global_name ||
    discordUsername ||
    username ||
    userProps?.discordDetails?.username ||
    "Username not found"
  );
};

export default selectUserDisplayName;
