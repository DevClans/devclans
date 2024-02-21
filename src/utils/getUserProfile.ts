// import { UserModel } from "@/mongodb/models";
// import redisClient from "@/redis/config";
// import {
//   zodGithubInstallationId,
//   zodMongoId,
//   zodUserGithubDetailsSchema,
//   zodUserSearchInfoSchema,
// } from "@/zod/zod.common";
// import dbConnect from "./mongoose.config";
// import { getOctokit } from "@/github/config.github";
// import {
//   UserGithubDetailsProps,
//   UserProps,
//   UserRedisKeys,
// } from "@/types/mongo/user.types";

// export const getUserGithubProfile = async (
//   userId: string,
//   installId: number,
//   repos?: string[]
// ) => {
//   console.log("fetching user github profile");
//   const userid = zodMongoId.parse(userId);
//   const installid = zodGithubInstallationId.parse(installId);
//   const api = await getOctokit({ installationId: installid });
//   if (!(api && api.type === "app")) {
//     console.log("error getting octokit");
//     throw new Error("Error getting octokit");
//   }
//   // Fetch user profile
//   const userData = await api.api.request("GET /user", {
//     headers: {
//       "X-GitHub-Api-Version": "2022-11-28",
//     },
//   });
//   if (userData.status !== 200) {
//     console.log("error getting user data");
//     throw new Error("Error getting user data");
//   }
//   const userProfile = zodUserGithubDetailsSchema.parse(userData.data);
//   console.log("userProfile", userProfile);
//   console.log("fetching user readme");
//   const userReadme = await fetch(
//     `https://api.github.com/repos/${userProfile.login}/${userProfile.login}/contents/README.md`
//   );
//   const readmeData = await userReadme.json();
//   console.log(readmeData, "readmeData");
//   const updateData: Partial<UserProps> = {
//     githubId: userProfile.login,
//     githubDetails: { ...userProfile, installId: installid },
//     repos: repos,
//   };
//   if (readmeData?.content) {
//     console.log("updating readme content");
//     const readmeContent = Buffer.from(readmeData.content, "base64").toString();
//     if (typeof readmeContent == "string") {
//       (updateData["githubDetails"] as any)["readme"] = readmeContent;
//     }
//   }
//   console.log("updating user github details");
//   await dbConnect();
//   const updatedUser = await UserModel.findOneAndUpdate(
//     { _id: userid },
//     {
//       $set: updateData,
//     },

//     { new: true } // Return the updated document
//   );
//   console.info("user updated successfully");
//   // add user data in cache
//   try {
//     console.log("trying to add user data in cache");
//     const githubData = zodUserGithubDetailsSchema
//       .partial()
//       .safeParse(updatedUser.githubDetails);
//     if (githubData.success) {
//       console.log("adding user github data in cache");
//       const pipeline = redisClient.pipeline();
//       //   settting user search info in cache
//       pipeline.set(
//         UserRedisKeys.list + ":" + userid,
//         JSON.stringify(zodUserSearchInfoSchema.partial().parse(updatedUser))
//       );
//       //    setting user github data in cache
//       pipeline.set(
//         UserRedisKeys.github + ":" + userid,
//         JSON.stringify(githubData.data)
//       );
//       //   setting user repos in cache
//       if (Array.isArray(repos) && repos.length) {
//         pipeline.set(UserRedisKeys.repos + ":" + userid, JSON.stringify(repos));
//       }
//       //   setting user install id in cache
//       pipeline.set(
//         UserRedisKeys.installId + ":" + userid,
//         JSON.stringify(installid)
//       );
//       //   setting expiry for all keys
//       pipeline.expire(
//         UserRedisKeys.installId + ":" + userid,
//         60 * 60 * 24 * 365
//       ); // 1 year
//       pipeline.expire(UserRedisKeys.repos + ":" + userid, 60 * 60 * 24 * 365); // 1 year. no need to change frequently
//       pipeline.expire(UserRedisKeys.list + ":" + userid, 60 * 60 * 3);
//       pipeline.expire(UserRedisKeys.github + ":" + userid, 60 * 60 * 3);
//       await pipeline.exec();
//     } else {
//       console.error("github data not valid", githubData.error);
//     }
//   } catch (error) {
//     console.error("error adding user github data in cache", error);
//   }
// };
