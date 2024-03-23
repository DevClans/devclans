"use client";
import { fallbackImg, fallbackImgUser } from "@/constants";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

const ImageComp = ({
  src,
  isUser = false,
  ...rest
}: ImageProps & { isUser?: boolean }) => {
  const [error, setError] = useState(false);
  return (
    <>
      <Image
        src={error ? (isUser ? fallbackImgUser : fallbackImg) : src}
        {...rest}
        style={{
          mixBlendMode: error
            ? !isUser
              ? "color-dodge"
              : "difference"
            : "normal",
          ...rest.style,
        }}
        alt={rest.alt || "image"}
        onError={() => setError(true)}
        onLoad={(img) => {
          if (img.currentTarget.naturalWidth < 1) {
            setError(true);
          }
        }}
      />
    </>
  );
};

export default ImageComp;
