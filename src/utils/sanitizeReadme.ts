import { sanitize } from "isomorphic-dompurify";
import { parse } from "marked";
export const sanitizeReadme = async (readme?: string | null) => {
  try {
    if (!readme || typeof readme !== "string") {
      return null;
    }
    return sanitize(await parse(readme));
  } catch (error) {
    console.error("error sanitizing readme", error);
    return null;
  }
};
