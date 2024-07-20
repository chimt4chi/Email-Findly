// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Create a SMTP transporter using Ethereal Email credentials
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Email content
    const mailOptions = {
      from: "rs9990271.code@gmail.com", // Replace with your verified sender
      to,
      subject,
      text,
    };

    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({
        message: "Email sent successfully",
        previewUrl: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
