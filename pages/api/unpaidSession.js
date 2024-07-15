import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const sendScheduledEmail = async (req, res) => {
  try {
    const { data: availableCourses, error } = await supabase
      .from("course")
      .select(
        `
    id, isWorkshop, 
    teacher(wixProfileNumber, user(firstname, lastname)), 
    topic(name), 
    courseStudent(payer(id, user(firstname, lastname, email))), 
    packagePurchased(numberOfSessions)
  `
      )
      .eq("isWorkshop", false);
    if (error) throw error;
    const { data: sessionsData, error: sessionError } = await supabase
      .from("session")
      .select(`isHeld, courseId`)
      .neq("isHeld", "CON");
    if (sessionError) throw sessionError;

    // Get the list of course IDs that are already present in the "introMeetingMailLog" table
    const { data: emailLogData, error: emailLogError } = await supabase
      .from("unpaidSessionMailLog")
      .select(`courseId, remainingSession, payerId, date`);

    if (emailLogError) throw emailLogError;

    const coursesWithRemainingSession = availableCourses.map((course) => {
      const totalNumberOfSessionsPurchased = course.packagePurchased.reduce((sum, p) => sum + p.numberOfSessions, 0);

      // Filter sessionsData to find sessions that match the courseId of the current course
      const matchingSessions = sessionsData.filter((session) => session.courseId === course.id);

      // Calculate the number of remaining sessions
      const remainingSession = totalNumberOfSessionsPurchased - matchingSessions.length;

      // Return a new object that includes all the original data from course, plus the remainingSession
      return {
        ...course,
        remainingSession,
      };
    });

    const filteredCourses = coursesWithRemainingSession.filter((course) => course.remainingSession < 0);

    const data = filteredCourses.filter((filteredCourse) => {
      for (const courseStudent of filteredCourse.courseStudent) {
        const payerId = courseStudent.payer.id;
        const emailLogsForThisCourse = emailLogData.filter(
          (log) => log.courseId === filteredCourse.id && log.payerId === payerId
        );

        if (emailLogsForThisCourse.length === 0) {
          return true; // This course has never appeared in the log, so include it
        }

        // Sort the logs for this course by date, and get the most recent one
        const mostRecentLog = emailLogsForThisCourse.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        // Only include this course if its remainingSession have changed since the most recent log
        return mostRecentLog.remainingSession !== filteredCourse.remainingSession;
      }
    });

    if (data.length > 0) {
      // Create a Nodemailer transporter with your SMTP settings
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "szamanpour@darsoon.com",
          pass: process.env.SHIMA_MAIL_PASSWORD,
        },
      });

      // Loop through the data and send an email for each record
      for (const course of data) {
        for (const courseStudent of course.courseStudent) {
          const payer = courseStudent.payer;
          const payerEmail = payer.user.email;
          const courseId = course.id;
          const emailBody = `Hi ${payer.user.firstname},<br/><br/>

          This is a friendly reminder that your Darsoon account has a balance due. You currently have ${Math.abs(
            course.remainingSession
          )} unpaid sessions for your ${course.topic.name} class with ${course.teacher.user.firstname} ${
            course.teacher.user.lastname
          }.<br/><br/>

          To purchase a new package of your choice, please head over to your tutor's <a href='https://darsoon.com/tutors/${
            course.teacher.wixProfileNumber
          }'>profile page</a> on our website or renew your package in the "Courses" section of your <a href="https://dashboard.darsoon.com">dashboard</a>.<br/><br/>

          If you have any questions or need assistance, don't hesitate to contact us directly. We're here to help!<br/><br/>

          Sincerely,<br/><br/>

          <img src='https://s30.picofile.com/file/8473131318/_%D8%AC%D8%B4%D9%86_%D9%86%D9%88%D8%B1%D9%88%D8%B2%DB%8C_1200_x_300_px_.png' alt='ٌWorkshop' width='100%' /><br/><br/>

          <a href='https://www.darsoon.com/service-page/%D8%AC%D8%B4%D9%86-%D8%A2%D9%86%D9%84%D8%A7%DB%[…]3%DB%8C-%D8%B2%D8%A8%D8%A7%D9%86?referral=service_list_widget' style='color: white; background-color: orange; padding: 8px 16px; font-weight: bold;'>ثبت‌نام رایگان</a><br /><br />
`;
          const excludedEmails = [
            "faranak@gmail.com",
            "ffarzad@darsoon.com",
            "n_arshadi@yahoo.com",
            "baghbanan@gmail.com",
          ];
          if (!excludedEmails.includes(payerEmail)) {
            const mailOptions = {
              from: "szamanpour@darsoon.com",
              to: payerEmail,
              subject: `Action Required: Unpaid Sessions for Your ${course.topic.name} Class`,
              html: emailBody,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully for course ID: ${courseId}`);
            const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format "YYYY-MM-DD"
            await supabase.from("unpaidSessionMailLog").insert([
              {
                courseId: courseId,
                date: currentDate,
                remainingSession: course.remainingSession,
                emailBody: emailBody,
                payerId: payer.id,
                isArchived: false,
              },
            ]);
            console.log(`Log entry added for course ID: ${courseId}`);
          }
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
