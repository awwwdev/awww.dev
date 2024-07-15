import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, id, subject, description } = req.body;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "ykerachian@darsoon.com",
          pass: process.env.YASER_MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "ykerachian@darsoon.com",
        to: "info@darsoon.com",
        subject: `🐞 | ${subject}`,
        text: `Firstname: ${firstname}\nLastname: ${lastname}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).send("Email sent successfully!");
    } catch (error) {
      res.status(500).send("Error sending email");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
