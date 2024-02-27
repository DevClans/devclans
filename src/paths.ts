import { urlUser } from "./constants";

export const editProfile = (id?: string) =>
  urlUser({ username: `${id + "?mode=edit"}` });
