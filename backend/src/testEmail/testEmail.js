import express from "express";
import nodemailer from "nodemailer";
import xoauth2 from "xoauth2";
let app = express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

/*------------------SMTP Over-----------------------------*/

function sendVerificationEmail(to, codigo) {
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
    user: "clinisharesrl@gmail.com",
    pass: "Clini5hareRocksMan",
     })
     }
  
    },
  );

  let mailOptions = {
    to,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Este es su código para verificar su email.<br>" +
      " " +
      codigo,
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

/*------------------Routing Started ------------------------*/

// app.get('/',function(req,res){
//     res.sendfile('index.html');
// });
// app.get('/send',function(req,res){
//         rand=Math.floor((Math.random() * 100) + 54);
//     host=req.get('host');
//     link="http://"+req.get('host')+"/verify?id="+rand;
//     mailOptions={
//         to : req.query.to,
//         subject : "Please confirm your Email account",
//         html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
//     }
//     console.log(mailOptions);
//     smtpTransport.sendMail(mailOptions, function(error, response){
//      if(error){
//             console.log(error);
//         res.end("error");
//      }else{
//             console.log("Message sent: " + response.message);
//         res.end("sent");
//          }
// });
// });

// app.get('/verify',function(req,res){
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
//     console.log("Domain is matched. Information is from Authentic email");
//     if(req.query.id==rand)
//     {
//         console.log("email is verified");
//         res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
//     }
//     else
//     {
//         console.log("email is not verified");
//         res.end("<h1>Bad Request</h1>");
//     }
// }
// else
// {
//     res.end("<h1>Request is from unknown source");
// }
// });

// /*--------------------Routing Over----------------------------*/

// app.listen(3000,function(){
//     console.log("Express Started on Port 3000");
// });
