"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import ProductImg from "./project/ProjectImg";
import ButtonClose from "./buttons/ButtonClose";

const ImageUpload = ({
  defaultImgs,
  name,
  setValue,
}: {
  setValue: any;
  defaultImgs?: string[];
  name: string;
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(defaultImgs || []);

  const handleCancel = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index)); // Remove the image at the given index
  };
  useEffect(() => {
    setValue(name, imageUrls);
  }, [imageUrls, name, setValue]);
  return (
    <div className="fcfs gap-2 w100">
      <div className="gap-1 fcfs">
        <h3 className="w100 text-xl  text-highlight ">Upload Images</h3>
        <p>Showcase sneak peaks of your app to other devs</p>
      </div>
      <UploadDropzone
        appearance={{
          container: "card2 w100",
        }}
        onBeforeUploadBegin={(files: File[]) => {
          if (
            Array.isArray(defaultImgs) &&
            defaultImgs.length + files.length > 4
          ) {
            alert("You can only upload 10 images");
            return files.slice(0, 10 - defaultImgs.length);
          }
          return files;
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          setImageUrls((prevUrls) => [
            ...prevUrls,
            ...res.map((image: any) => image.url),
          ]);
          console.log("img url", res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrls.length > 0 && (
        <div className="frc gap-2 w100 scrollbar">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative">
              <ProductImg src={url} alt={`Uploaded Image ${index}`} />
              <ButtonClose onClick={() => handleCancel(index)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
