"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleCancel = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index)); // Remove the image at the given index
  };

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res:any) => {
          setImageUrls(prevUrls => [...prevUrls, ...res.map((image: any) => image.url)]);
          console.log("img url", res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrls.length > 0 && (
        <div>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <Image src={url} alt={`Uploaded Image ${index}`} width={500} height={300} />
              <button className="border-2 border-white bg-gray-400 text-black px-2 py-1" onClick={() => handleCancel(index)}>Cancel</button> {/* Cancel button for each image */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;