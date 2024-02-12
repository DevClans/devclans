import { FormData } from "@/app/connect/page";
import { Fetch } from "./fetchApi";

export async function sendEmail(data: FormData) {
  console.log(data);
  await Fetch({
    endpoint: "/email",
    method: "POST",
    headers: {
      body: JSON.stringify(data),
    },
  });
}
