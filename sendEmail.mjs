import nodemailer from "nodemailer";

const sendEmail = async () => {
  // Create a Nodemailer transporter with your SMTP settings
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mehditareghi@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: "mehditareghi@gmail.com",
    to: "mehdi.tareghi@darsoon.com",
    subject: "Test Email",
    text: "This is a test email sent using Nodemailer.",
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
  }
};

// Invoke the sendEmail function to send the email
sendEmail();
