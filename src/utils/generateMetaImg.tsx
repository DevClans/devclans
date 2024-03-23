import { urlBase } from "@/constants";
import userAvatar from "@/lib/userAvatar";
import { UserProps } from "@/types/mongo/user.types";
import { Fetch } from "@/utils/fetchApi";
import { ImageResponse } from "next/og";

// export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export default async function generateUserMetaImg({
  params,
}: {
  params: { id: string };
}) {
  try {
    const id = params?.id;
    const user: UserProps | null = await Fetch({
      endpoint: `/user/${id}`,
    });
    if (!user || (user && ("error" in user || "message" in user))) {
      console.error("User not found in twitter image");
      throw new Error("User not found in metadata image");
    }
    const {
      username,
      discordDetails: { avatar, _id: disID },
      discordId,
    } = user;
    const avtr = await userAvatar({
      discordImg: avatar,
      discordId: discordId || disID,
    });
    if (!username) {
      console.error("Username not found in open graph image");
      throw new Error("Username not found in open graph image");
    }
    const usernm = `@${username}`;
    console.log("generating user meta image", username);
    return new ImageResponse(
      (
        <div
          style={{
            maxWidth: "1200px",
            position: "relative",
            width: "100%",
            height: "100%",
            maxHeight: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#010816",
            fontFamily: "poppins, montserrat, sans-serif",
          }}
        >
          <div
            style={{
              zIndex: 0,
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={urlBase + "/homeHeroBg.png"}
              alt="home background"
              width={"100"}
              height={"inherit"}
              style={{
                maxHeight: 630,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {avtr && (
            <img
              src={avtr}
              height={280}
              width={280}
              style={{
                border: "1px solid #132341",
                boxShadow:
                  "0px 4px 5.3px 0px rgba(20, 26, 37, 0.2) inset, 0px -4px 3px 0px rgba(6, 12, 24, 0.1) inset",
                padding: 5,
                height: 280,
                width: 280,
                background:
                  "linear-gradient(139deg, rgba(23, 55, 120, 0.30) 1.39%, rgba(25, 55, 113, 0.30) 100%)",
                backdropFilter: "blur(41.04999923706055px)",
                aspectRatio: "1/1",
                borderRadius: "40px",
                objectFit: "cover",
              }}
            />
          )}
          <h1
            style={{
              fontSize: "54px",
              marginTop: "60px",
              color: "#e2e8ff",
              textAlign: "center",
              fontStyle: "normal",
              fontWeight: "600",
              textTransform: "capitalize",
              background:
                "linear-gradient( 189deg, #fff 7.14%, rgba(188, 188, 188, 0.92) 76.62%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {usernm}
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontStyle: "normal",
              marginTop: "10px",
              color: "#e2e8ff",
            }}
          >
            devclans.com/
            <span
              style={{
                color: "#457BE3",
                fontWeight: "semibold",
              }}
            >
              {username}
            </span>
          </p>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error: any) {
    console.log(`${error?.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
