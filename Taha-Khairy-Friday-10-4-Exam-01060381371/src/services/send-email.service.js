import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mas3ode20@gmail.com",
    pass: "",
  },
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "mas3ode20@gmail.com",
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
