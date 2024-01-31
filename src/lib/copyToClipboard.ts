"use client";
import { toast } from "react-toastify";

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  // toast.success("Copied to clipboard");
};

export default copyToClipboard;
