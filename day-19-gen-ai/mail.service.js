import nodemailer from "nodemailer";
import { google } from "googleapis";
// import { text } from "express";

const OAuth2 = google.auth.OAuth2;

export async function sendEmail({ to, subject, html,text}) {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_KEY,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = (await oauth2Client.getAccessToken()).token;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_KEY,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text
    
  };

 const info = await transporter.sendMail(mailOptions);


return `Email sent successfully to ${to}`;
}