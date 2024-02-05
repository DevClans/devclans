import { parse } from "url";

export const getSearchParams = (url: string) => {
  try {
    const newurl = new URL(url);
    return parse(newurl.search, true).query;
  } catch (error) {
    console.log(error, "error in getSearchParams");
  }
};
