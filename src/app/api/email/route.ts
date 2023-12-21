import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.EMAIL_PASSWORD;

export async function POST(request: NextRequest) {
  const { email, name, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
            setting service as 'gmail' is same as providing these setings:
      
            host: "smtp.gmail.com",
            port: 465,
            secure: true
            
            If you want to use a different email provider other than gmail, you need to provide these manually.
            Or you can go use these well known services and their settings at
            https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
        */
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: EMAIL,
    to: EMAIL,
    subject: `Message from ${name} (${email})`,
    text: message,
    replyTo: email,
  };

  const sendMail = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMail();

    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
