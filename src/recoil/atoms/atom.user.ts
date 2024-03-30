import { UserProps } from "@/types/mongo/user.types";
import { atom } from "recoil";
export const atomUser = atom<Partial<UserProps>>({
  key: "atomUser",
  default: {},
});
