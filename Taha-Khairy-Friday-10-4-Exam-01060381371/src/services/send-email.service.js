import nodemailer from "nodemailer";

export const sendEmailService = () => {
  // transport configration
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587, // 465 =>> secure => true
    secure: false, // true for 465 false for ather ports , TLS
    auth: {},
  });
};
