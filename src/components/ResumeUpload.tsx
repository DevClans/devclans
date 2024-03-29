"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";

const ResumeUpload = ({
  setValue,
  defaultResumeUrl,
}: {
  setValue: any;
  defaultResumeUrl?: string;
}) => {
  const [resumeUrl, setResumeUrl] = useState<string>(defaultResumeUrl || "");

  const handleUploadComplete = (res: any) => {
    setResumeUrl(res[0].url);
    setValue("resume", res[0].url);
  };

  return (
    <div className="fcfs gap-2 w100">
      <div className="gap-1 fcfs">
        <h3 className="w100 text-xl text-highlight">Upload Resume</h3>
        <p>Upload your resume in PDF format.</p>
      </div>
      <UploadDropzone
        appearance={{
          container: "card2 w100",
        }}
        onBeforeUploadBegin={(files: File[]) => {
          if (files.length > 1) {
            alert("You can only upload one resume file");
            return files.slice(0, 1);
          }
          return files;
        }}
        endpoint="resumeUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {resumeUrl && (
        <div className="frc gap-2 w100">
          <p>Uploaded Resume: {resumeUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;