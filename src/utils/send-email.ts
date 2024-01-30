import { FormData } from "@/app/contact-us/page";
import { Fetch } from "./fetchApi";

export function sendEmail(data: FormData) {
  console.log(data);
  Fetch({
    endpoint: "/email",
    method: "POST",
    headers: {
      body: JSON.stringify(data),
    },
  })
    .then((res) => console.log(res))
    .then((response: any) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
