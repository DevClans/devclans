// ? this can me made customizable component like buttonLink or fetchapi is built
export const getGithubReadmeNew = async ({
  githubApi,
  username,
  repoName,
  githubUrl,
  branch,
  type = "readme",
}: {
  githubUrl?: string;
  repoName?: string;
  githubApi: any;
  username?: string;
  branch?: string;
  type?: "contributing" | "readme" | "languages";
}) => {
  try {
    let readmeData: any;
    if (
      githubApi &&
      (githubApi.type == "auth" || githubApi.type == "app") &&
      username &&
      repoName
    ) {
      let data: any;
      console.info("fetching from github with auth for", type);
      if (type == "languages") {
        data = await githubApi.api.request(
          "GET /repos/{owner}/{repo}/languages",
          {
            owner: username,
            repo: repoName,
            ref: branch || "main",
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
      } else {
        const path = type === "contributing" ? "CONTRIBUTING.md" : "README.md";
        data = await githubApi.api.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: username,
            repo: repoName,
            path: path,
            ref: branch || "main",
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
      }
      console.info("data from github", data);
      if (data.status == 200) {
        console.info("found data github");
        readmeData = data.data;
      }
    } else {
      if (!githubUrl) {
        console.error("githubUrl not found");
        return null;
      }
      console.info("fetching from github wihtout auth for", type, githubUrl);
      // README
      const readmeUrl = `${githubUrl}/${type}`;

      const readmeResponse = await fetch(readmeUrl);
      if (!readmeResponse.ok)
        throw new Error(
          `GitHub request failed with status ${readmeResponse.status}`
        );
      readmeData = await readmeResponse.json();
    }
    if (readmeData) {
      if (type === "languages") {
        return readmeData;
      }
      const readmeContent = Buffer.from(
        readmeData.content,
        "base64"
      ).toString();
      return readmeContent;
    }
    return null;
  } catch (error) {
    console.error("error getting user github for", type, error);
    return null;
  }
};
