"use client";
import { z } from "zod";

export const handleGithubChangeRepos = async () => {
  const url = `https://github.com/apps/devclans/installations/new`;
  window.open(url, "_blank");
};

export const handleGithubConnect = async () => {
  const clientID = z.string().parse(process.env.GH_CLIENT_ID);
  const redirect_uri = z
    .string()
    .startsWith("http")
    .max(150)
    .parse(process.env.GH_REDIRECT_URI);
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}`;

  // Open the URL in a new tab
  window.open(authUrl, "_blank");
  // window.location.href = `${urlApi}/auth/github/connect`;
  // this is not possible because of the cors issue on redirect. github does not allow redirect to localhost
  // const res = await Fetch({
  //   endpoint: "/auth/github/connect",
  //   needError: true,
  //   redirect: "follow",
  // });
  // if (res) {
  //   console.log("res", res);
  // }
};
