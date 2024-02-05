// import { BookmarkModel, LikeModel, ProjectModel, UserModel } from "./models";

// // Connect to MongoDB
// const dbUrl = "mongodb://localhost:27017/devclans";

// const createDummyData = async () => {
//   mongoose
//     .connect(dbUrl)
//     .then(async () => {
//       console.log("Connected to MongoDB");
//       const dummyUserData = {
//         discordId: "123456789",
//         githubId: "dummyGitHubUser",
//         username: "dummyUser",
//         avatar: "dummyAvatarURL",
//         bio: "This is a dummy user bio.",
//         phone: "1234567890",
//         email: "dummyuser@example.com",
//         contactMethod: "email",
//         socials: {
//           twitter: "dummyTwitter",
//           telegram: "dummyTelegram",
//           linkedin: "dummyLinkedin",
//           website: "dummyWebsite",
//         },
//         skills: ["JavaScript"],
//         ownedProjects: [], // Dummy value for ownedProjects
//         contributedProjects: [], // Dummy value for contributedProjects
//       };
//       await UserModel.create(dummyUserData)
//         .then((user) => {
//           console.log("User created:", user);
//         })
//         .catch((error) => {
//           console.error("Error creating user:", error);
//         });

//       const dummyProjectData = {
//         title: "Dummy Project",
//         desc: "This is a dummy project description.",
//         owner: new mongoose.Types.ObjectId("65a5c5088ff73712ce98eb74"), // Replace with a valid user ID
//         contributors: ["65a5c5088ff73712ce98eb74"], // Dummy value for contributors
//         topics: ["ml", "android"],
//         skills: ["tech: html", "css"],
//         githubLink: "https://github.com/dummyuser/dummyproject",
//         likesCount: 0,
//         bookmarkCount: 0,
//         projectLinks: ["https://dummyproject.com"],
//         projectDetails: {
//           problem: "Dummy problem statement",
//           challenges: [
//             {
//               title: "Challenge 1",
//               desc: "Description of Challenge 1",
//               solution: "Solution to Challenge 1",
//             },
//           ],
//           futureGoals: [
//             {
//               title: "Future Goal 1",
//               desc: "Description of Future Goal 1",
//               needHelp: false,
//             },
//           ],
//           memberReq: [
//             {
//               title: "Member Requirement 1",
//               desc: "Description of Member Requirement 1",
//             },
//           ],
//         },
//         team: [], // Dummy value for team
//         needMembers: "beginner",
//         imgs: [
//           "https://dummyproject.com/image1",
//           "https://dummyproject.com/image2",
//         ],
//         video: "https://dummyproject.com/video",
//         devStage: "idea",
//         published: false,
//       };

//       // Create a new project instance
//       const dummyProject = new ProjectModel(dummyProjectData);

//       // Save the project to the database
//       await dummyProject
//         .save()
//         .then((project: any) => {
//           console.log("Dummy project created:", project);
//         })
//         .catch((error: any) => {
//           console.error("Error creating dummy project:", error);
//         });

//       const dummyBookmarkData = {
//         user: new mongoose.Types.ObjectId("65a5c5088ff73712ce98eb74"), // Replace with a valid user ID
//         project: new mongoose.Types.ObjectId("65a5c61ad1ed6367c9f02199"), // Replace with a valid project ID
//         timestamp: new Date(),
//       };

//       // Create a new bookmark instance
//       const dummyBookmark = new BookmarkModel(dummyBookmarkData);
//       await dummyBookmark
//         .save()
//         .then((bookmark: any) => {
//           console.log("Dummy bookmark created:", bookmark);
//         })
//         .catch((error: any) => {
//           console.error("Error creating dummy bookmark:", error);
//         });
//       const dummyLikeData = {
//         user: new mongoose.Types.ObjectId("65a5c5088ff73712ce98eb74"), // Replace with a valid user ID
//         project: new mongoose.Types.ObjectId("65a5c61ad1ed6367c9f02199"), // Replace with a valid project ID
//         timestamp: new Date(),
//       };

//       // Create a new bookmark instance
//       const dummyLike = new LikeModel(dummyLikeData);
//       await dummyLike
//         .save()
//         .then((bookmark: any) => {
//           console.log("Dummy bookmark created:", bookmark);
//         })
//         .catch((error: any) => {
//           console.error("Error creating dummy bookmark:", error);
//         });
//     })
//     .catch((error: any) => {
//       console.error("Error connecting to MongoDB:", error);
//     })
//     .finally(() => {
//       mongoose.disconnect();
//     });
// };

// // createDummyData();
