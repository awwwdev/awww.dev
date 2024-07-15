import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const sendScheduledEmail = async (req, res) => {
  try {
    const currentDate = new Date().toISOString();
    const { data: availableCourses, error } = await supabase
      .from("course")
      .select(
        `id, isWorkshop, introductionDate, introductionStatus, teacher(wixProfileNumber, user(*)), topic(name), courseStudent(payer(id, user(*)))`
      )
      .match({ introductionStatus: "YES" })
      .eq("isWorkshop", false)
      .lt("introductionDate", currentDate); // Filter out courses with introductionDate before the current date

    if (error) throw error;
    // Get the list of course IDs that are already present in the "introMeetingMailLog" table
    const { data: emailLogData, error: emailLogError } = await supabase
      .from("introMeetingMailLog")
      .select(`courseId, payerId`);

    if (emailLogError) throw emailLogError;

    // Extract the list of course IDs from the email log data
    const emailLogCourseIds = emailLogData.map((log) => ({ courseId: log.courseId, payerId: log.payerId }));

    const data = availableCourses.filter((course) => {
      for (const courseStudent of course.courseStudent) {
        const payerId = courseStudent.payer.id;
        if (emailLogCourseIds.some((log) => log.courseId === course.id && log.payerId === payerId)) {
          return false;
        }
      }
      return true;
    });

    if (data.length > 0) {
      // Create a Nodemailer transporter with your SMTP settings
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "zmoghadasian@darsoon.com",
          pass: process.env.SAEIDE_MAIL_PASSWORD,
        },
      });

      // Loop through the data and send an email for each record
      for (const course of data) {
        for (const courseStudent of course.courseStudent) {
          const payer = courseStudent.payer;
          const payerEmail = payer.user.email;
          const courseId = course.id;
          const emailBody = `Dear ${payer.user.firstname} ${payer.user.lastname},<br/><br/>

We would like to thank you for choosing Darsoon. You have had an introductory session with <strong>${course.teacher.user.firstname} ${course.teacher.user.lastname}</strong> on <strong>${course.introductionDate}</strong> for <strong>${course.topic.name}</strong> class. If you are now interested in taking lessons, you can visit your tutor’s page on <strong><a href='https://darsoon.com/tutors/${course.teacher.wixProfileNumber}'>our website</a></strong>, and purchase your preferred package. Once you make the payment, or if you have already done that, you can contact the tutor directly and schedule your classes.<br/><br/>

We would kindly ask you to review Darsoon rules in this <strong><a href="https://www.darsoon.com/faq">FAQ link</a></strong> prior to the start of the classes. Please note that you can change the time of a session if you contact your tutor 24 hrs before the start of the class.<br/><br/>

We hope you will have a great experience with Darsoon. We also appreciate it if you can share your feedback with us about Darsoon and in particular the introductory session.<br/><br/>

Best regards,
`;
          const mailOptions = {
            from: "zmoghadasian@darsoon.com",
            to: payerEmail,
            subject: "Darsoon - Introductory session",
            html: emailBody,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent successfully for course ID: ${courseId}`);
          const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format "YYYY-MM-DD"
          await supabase
            .from("introMeetingMailLog")
            .insert([
              { courseId: courseId, date: currentDate, emailBody: emailBody, payerId: payer.id, isArchived: false },
            ]);
          console.log(`Log entry added for course ID: ${courseId}`);
        }
      }
    } else {
      console.log("No data available from the 'course' table. Skipping email sending.");
    }

    res.status(200).send("Emails sent successfully from cron job");
  } catch (error) {
    console.error("Error sending emails from cron job", error);
    res.status(500).send("Error sending emails from cron job");
  }
};

export default sendScheduledEmail;
