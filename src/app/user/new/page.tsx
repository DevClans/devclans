import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { urlUser } from "@/constants";

export const metadata: Metadata = {
  title: "Update User",
};

export default async function NewUser() {
  const session: any = await getServerSessionForServer();
  const sessionUser = session?.user?._id;
  if (!sessionUser) {
    return (
      <h3 className="text-text normal-case">
        Login to access this page. If logged in then try reloading...
      </h3>
    );
  }
  return redirect(
    urlUser({
      username: sessionUser + "?mode=edit&new=true",
      onlyEndpoint: true,
    })
  );
}
