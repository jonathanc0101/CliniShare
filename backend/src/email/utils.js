import nodemailer from "nodemailer";
import { getEmailFromTemplate } from "./template.js";
import dotenv from "dotenv";
dotenv.config();

export function sendVerificationEmail(to, codigo) {
  let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.user,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
    },
  });

  let mailOptions = {
    from: "CliniShare <" + process.env.user  + ">",
    to,
    subject: "Por favor confirme su código de email",
    html: getEmailFromTemplate(codigo),
  };

  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
  });
}
