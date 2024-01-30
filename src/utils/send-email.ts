import { FormData } from "@/app/contact-us/page";
import { urlApi } from "@/constants";

export function sendEmail(data: FormData) {
  const apiEndpoint = urlApi + "/email";
  console.log(data);

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
