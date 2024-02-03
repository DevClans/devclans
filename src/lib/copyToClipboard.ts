"use client";
// import { toast } from "react-toastify";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
    // toast.success("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};

export default copyToClipboard;
