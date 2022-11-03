import { Injectable } from "@nestjs/common";
import * as sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, FROM_EMAIL } from "../common/config";
sgMail.setApiKey(SENDGRID_API_KEY);



@Injectable()
export class EmailService {
  async sendEmail(email: string, otp: string) {
    try {
      const msg = {
        to: email,
        from: FROM_EMAIL,
        subject: 'MediaEye OTP',
        text: 'OTP text',
        html: getEmailTemplate(otp, email.split('@')[0])
      };
      //@ts-ignore
      const res = await sgMail.send(msg);
      // console.log(msg);
    } catch (error) {
      console.log(error);
    }
  }
}

function getEmailTemplate(otp: string, name: string) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet">
      <title>Document</title>
  </head>
  <body>
      <div class="main" style="width:600px; color: #fff; margin:auto;  background-color: #141235; background-image:url(https://universal-metavatars.io/emailassets/platfromemails/avatar-radial.png); background-repeat: no-repeat; background-size: cover;">
          <div class="inner" style="padding:50px; text-align: center;" >
             <div class="meta-logo"><img src="https://universal-metavatars.io/emailassets/platfromemails/avatar-logo.png"/></div>
             <h4 style="font-size:24px; font-weight:400;  font-family: 'Poppins', sans-serif;  margin-top: 50px; margin-bottom:30px; ">Hello, ${name}!</h4>
             <h5 style="font-size:32px; font-weight:600;  font-family: 'Poppins', sans-serif; margin-bottom:15px;">Your one time password</h5>
             <h4 style="font-size:46px; font-weight:600; margin-bottom: 30px; font-family: 'Poppins', sans-serif; ">${otp}</h4>
             <p style="font-size:14px;  font-family: 'Poppins', sans-serif; font-weight:400; margin-bottom: 50px;">This otp is valid for 5 mins,<br/>
              Do not share it with anyone including Metavatar employees.</p>
             <p style="font-size:14px;  font-family: 'Poppins', sans-serif; font-weight:400;">Thank you for joining Metavatar!</p>
  
          </div>
      </div>
  </body>
  </html>`;
}