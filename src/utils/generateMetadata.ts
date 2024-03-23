import { urlBase } from "@/constants";
import { Metadata } from "next";
const commonDesc =
  "Explore projects, find mentors, and team up with potential co-founders, all within the 100xdevs cohort.";
const commonTitle = "Devclans";
const commonImg = {
  url: urlBase + "/metaImg.png",
  width: 1200,
  height: 630,
  alt: "Visit us at https://www.devclans.com | Devclans",
};

export const generateCommonMetadata = ({
  title: titleIs = commonTitle,
  description = commonDesc,
  img = commonImg.url,
  titleAbsolute = false,
  urlEndpoint,
}: {
  title?: string;
  description?: string;
  img?: string;
  titleAbsolute?: boolean;
  urlEndpoint?: string;
}): Metadata => {
  const title: Metadata["title"] = !titleAbsolute
    ? titleIs
    : {
        absolute: titleIs,
      };
  return {
    title,
    description,
    openGraph: {
      title,
      url: urlEndpoint ? urlBase + urlEndpoint : urlBase,
      description,
      images: [
        {
          ...commonImg,
          url: img,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [{ ...commonImg, url: img }],
    },
  };
};
