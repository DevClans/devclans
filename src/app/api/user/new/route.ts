import { NextResponse } from "next/server";
import { UserModel } from "@/models/models";

async function handler(req: Request) {
  const { name, email, discordId } = await req.json();
  try {
    console.log("Creating user using", name, email, discordId);

    const user = await UserModel.create({
      name,
      email,
      discordId,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: error });
  }
}

export { handler as POST };
