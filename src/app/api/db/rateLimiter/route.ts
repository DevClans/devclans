import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";

async function handler(req: Request) {
  await dbConnect();

  const { userId } = await req.json();

  try {
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid user parameter" });
    }

    const user = await UserModel.findOne({ username: userId });
    const providedTime: number = user.timeStart;
    const parsedTime = new Date(providedTime);
    console.log(parsedTime.toISOString());
    const currentTime = new Date();
    console.log(currentTime.toISOString());
    const timeDifferenceInMilliseconds =
      currentTime.getTime() - parsedTime.getTime();
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;

    console.log("Time Difference in Minutes:", timeDifferenceInMinutes);

    console.log(currentTime);

    if (user.flag === false) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: userId },
        {
          flag: true,
          timeStart: currentTime,
          $inc: { totalRequest: 1 },
        },
        { new: true }
      );

      return NextResponse.json({ updatedUser });
    }
    if (user.flag === true) {
      var updatedUser = await UserModel.findOneAndUpdate(
        { username: userId },
        { $inc: { totalRequest: 1 } },
        { new: true }
      );
      if (timeDifferenceInMinutes > 60) {
        const currentTime = new Date();
        console.log(currentTime.toISOString());
        updatedUser = await UserModel.findOneAndUpdate(
          { username: userId },
          {
            flag: false,
            totalRequest: 0,
            timeStart: currentTime,
          },
          { new: true }
        );
      }
      if (timeDifferenceInMinutes < 60 && updatedUser.totalRequest > 150) {
        return NextResponse.json({ message: "not allowed", allow: false });
      }

      return NextResponse.json({ updatedUser });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export { handler as PUT };
