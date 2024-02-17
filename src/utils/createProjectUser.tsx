import { urlApi } from "@/constants";
import { toast } from "react-toastify";

export const createProjectUser = async (
  endpoint: string,
  data: any,
  session: any,
  setError: any,
  toastMessage?: string,
  needAuth = true
) => {
  try {
    console.log("inside handleSubmit");
    // Check if the user is authenticated
    if (needAuth && !(session && session?._id)) {
      console.error("User is not authenticated.");
      toast.error("You need to be logged in to perform this action");
      return;
    }
    const response = await fetch(`${urlApi + endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id: session?._id || "" }),
    });
    console.log("response", response.status, response.statusText);
    if (response.status > 200) {
      throw new Error(`${response.statusText}`);
    }
    console.log("Profile updated successfully");
    toast.success(toastMessage || "Form submitted successfully", {
      autoClose: false,
    });
    return response;
  } catch (error: any) {
    console.error("Error updating profile", error.message);
    setError("root", {
      message:
        error?.message ||
        "Sorry, something's not right on our end. Please try again later.",
    });
    return null;
  }
};
