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
export default async function Image({ params }: { params: { id: string } }) {
  const id = params?.id;
  const user: UserProps | null = await Fetch({
    endpoint: `/user/${id}`,
  });
  if (!user || (user && ("error" in user || "message" in user))) {
    console.error("User not found in twitter image");
    return null;
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
  if (!(username && avtr)) {
    console.error("Username or avatar not found in open graph image");
    return null;
  }
  console.log("added user twitter image", username);
  return new ImageResponse(
    (
      <div
        className="relative w-full h-full bg-bg"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            zIndex: -100,
          }}
        >
          <img
            src={urlBase + "/homeHeroBg.png"}
            alt="home background"
            style={{ maxHeight: 840 }}
            className="w-full h-full object-cover"
          />
        </div>
        <img
          src={avtr}
          height={240}
          width={240}
          className={`card xl:max-h-[255px] xl:max-w-[428px] w-full h-full`}
          style={{
            padding: 5,
            background:
              "linear-gradient(139deg, rgba(23, 55, 120, 0.30) 1.39%, rgba(25, 55, 113, 0.30) 100%)",
            backdropFilter: "blur(41.04999923706055px)",
            aspectRatio: "1/1",
            borderRadius: "40px",
            objectFit: "cover",
          }}
        />
        <h1 className="text-[54px] mt-15">@{username}</h1>
        <p className="text-subH text text-4xl mt-2">
          devclans.com/
          <span className="text-primary font-semibold">{username}</span>
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
