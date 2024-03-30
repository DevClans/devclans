import { redirect } from "next/navigation";

const page = () => {
  return redirect("/explore/users");
};

export default page;
