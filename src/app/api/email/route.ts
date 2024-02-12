import { zodContactForm } from "@/zod/zod.common";
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    console.log("starting email route");
    const body = await request.json();
    const data = zodContactForm.parse(body?.data);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    // console.log("data", data, transport);

    const mailOptions: Mail.Options = {
      from: data.email || process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Message from ${data.name} (${data.email})`,
      text: data.message,
    };

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve("Email sent");
          } else {
            reject(err.message);
          }
        });
      });

    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err },
      {
        status: 500,
        statusText:
          err?.issues?.[0]?.message ||
          err?.message ||
          "Error sending email, Try again after some time",
      }
    );
  }
}
