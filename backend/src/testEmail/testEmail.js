import express from "express";
import nodemailer from "nodemailer";
import { getEmailFromTemplate } from "./template.js";

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

/*------------------SMTP Over-----------------------------*/

function sendVerificationEmail(to, codigo) {
  let smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    type: "OAuth2",
    user: "clinisharesrl@gmail.com",
    clientId: "911861983941-1kad6obsir034a2p0h17ovombsssn7if.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken : "1//04oWn_xK452rfCgYIARAAGAQSNwF-L9IrBGXZaGjxWo_24bj3GLWH1pdvqwkrZLp_h0wX1a1DKwXPuN8zagC2cNmKEjigfvORW0g"
     }
  
    },
  );

  let mailOptions = {
    from: "CliniShare <CliniShareSRL@gmail.com>",
    to,
    subject: "Por favor confirme su código de email",
    html: getEmailFromTemplate(codigo) 
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

sendVerificationEmail("jonathancavia0101@gmail.com", "12345");


