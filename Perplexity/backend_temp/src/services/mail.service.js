import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

export async function sendEmail({ to, subject, html, text }) {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_KEY,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,        
  secure: false,    
  family: 4, 
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_KEY,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const mailOptions = {
    from: `"Perplexity AI" <${process.env.GOOGLE_USER}>`,
    to,
    subject,
    html,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);

  return info;
}