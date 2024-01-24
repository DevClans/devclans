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
    const check = z.object({
      readmeUrl: z
        .string()
        .startsWith("https://api.github.com/repos/")
        .endsWith("/readme"),
      username: z.string(),
    });
    const params = check.parse({ readmeUrl, username });
    const { readmeUrl: rUrl, username: uname } = params;
    const url = rUrl || `https://api.github.com/repos/${uname}/${uname}/readme`;

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
