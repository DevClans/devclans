import { z } from "zod";
export default async function getGithubReadme({
  readmeUrl,
  username,
}:
  | {
      readmeUrl: string;
      username?: string;
    }
  | {
      readmeUrl?: string;
      username: string;
    }) {
  try {
    // check input
    const readme = z
      .string()
      .startsWith("https://api.github.com/repos/")
      .endsWith("/readme")
      .safeParse(readmeUrl);
    const rUrl = readme.success ? readme.data : "";
    const uname = z.string().min(1).max(100).parse(username);
    const url = rUrl || `https://api.github.com/repos/${uname}/${uname}/readme`;
    console.info("getting github readme", url);
    // run data fetch
    const readmeResponse = await fetch(url);

    if (!readmeResponse.ok) {
      throw new Error(
        `GitHub request failed with status ${readmeResponse.status}`
      );
    }

    const readmeData = await readmeResponse.json();
    const readmeContent = Buffer.from(readmeData.content, "base64").toString();
    return readmeContent;
  } catch (error: any) {
    console.error("Error fetching README from GitHub:", error.message);
  }
}
