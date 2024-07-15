import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, id, subject, description } = req.body;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "mehdi.tareghi@darsoon.com",
          pass: process.env.MEHDI_MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: "mehdi.tareghi@darsoon.com",
        to: "mehdi.tareghi@darsoon.com",
        subject: `🐞 | ${subject}`,
        text: `Name: ${name}\nID: ${id}\nDescription: ${description}`,
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
