import nodemailer from "nodemailer";
import config from "../config";

export const sentMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: "arafatjibon33@gmail.com",
      pass: "dxbc qhbp qele hdjk",
    },
  });

  await transporter.sendMail({
    from: "arafatjibon33@gmail.com",
    to,
    subject: "Change your password",
    text: "Reset your password within 10 mins!",
    html,
  });
};
