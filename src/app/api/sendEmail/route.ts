import nodemailer from "nodemailer";
import { NextResponse } from "next/server";


import formidable from  "formidable";
import fs from "fs/promises"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure:true,
    auth: {
      type: "OAuth2",
      clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
      clientSecret: process.env.GOOGLE_MAIL_SECRET_ID,
      refreshToken: "1//04ktucvnhvSQsCgYIARAAGAQSNwF-L9IrOKkF5m1yPU1QCgStWoF0jHAHsdZdOtI3jEUwJHjzobeSoTTj9B6BOoGoTIi234QvG4U",
      accessToken:"ya29.a0AfB_byBcTtVXmUfHsrafwQVvvE-0g8j7zHBA9i5h9_T9O69oQy4nYs4dnUAPnqPd-Ps4nSOPKF84nYRXnNHY65QAaozAm59LAvqWeV_0i7xpBxAKjGokMmRwRemy2B4Z5SJI6Gvi56dcpni6SppRLX4y7y_zHbT-T9xKaCgYKAfUSARISFQHGX2MigDYqxibZaFUmrQnwGRRCaQ0171",
      user: process.env.EMAIL, 

    }
  });


async function handler(req:Request){
    const { name, email, subject, message } = await req.json();

  const mailOptions = {
    from: email,
    to: process.env.SEND_EMAIL,
    subject: `New Message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info)
  });
  transporter.close();
  console.log("done")
  return NextResponse.json("done")
}

// async function handler(req: Request) {
//   try {
//       const form = new formidable.IncomingForm();
      
//       // Parse the form data
//       const formData = await new Promise((resolve, reject) => {
//           form.parse(req, (err, fields, files) => {
//               if (err) return reject(err);
//               resolve({ fields, files });
//           });
//       });

//       const { name, email, subject, message } = formData.fields;

//       // Assuming the file input name is 'attachment'
//       const attachment = formData.files.attachment;
//       const attachmentData = await fs.readFile(attachment.path);

//       const mailOptions = {
//           from: email,
//           to: process.env.EMAIL,
//           subject: `New Message: ${subject}`,
//           text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//           attachments: [
//               {
//                   filename: attachment.name,
//                   content: attachmentData,
//               },
//           ],
//       };

//       // Send the email
//       const info = await transporter.sendMail(mailOptions);
//       transporter.close();

//       console.log("Email sent:", info);

//       return NextResponse.json("Email sent successfully");
//   } catch (error) {
//       console.error("Error sending email:", error.message);
//       return NextResponse.error();
//   }
// }

export { handler as POST }
