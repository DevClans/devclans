import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export default async function getServerSessionForServer() {
  const session = await getServerSession(authOptions);
  return session;
}
