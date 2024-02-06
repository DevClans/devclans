"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  return (
    <>
      <UploadButton
        className="w100"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setImageUrl(res[0].url);
          console.log("img url", res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl.length ? (
        <div>
          <Image src={imageUrl} alt="Uploaded Image" width={500} height={300} />
        </div>
      ) : null}
    </>
  );
};

export default ImageUpload;
