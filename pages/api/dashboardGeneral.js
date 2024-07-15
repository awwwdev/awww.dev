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
      .select(`date, courseId, isHeld, packagePurchasedId`)
      .neq("isHeld", "CON")
      .order("date", { ascending: false });
    if (sessionError) throw sessionError;

    const { data: emailLogData, error: emailLogError } = await supabase
      .from("dashboardGeneralMailLog")
      .select(`packagePurchasedId, payerId`);

    if (emailLogError) throw emailLogError;

    const emailLogPackagePurchasedIds = emailLogData.map((log) => ({
      packagePurchasedId: log.packagePurchasedId,
      payerId: log.payerId,
    }));

    const coursesWithRemainingSession = availableCourses.map((course) => {
      const totalNumberOfSessionsPurchased = course.packagePurchased.reduce((sum, p) => sum + p.numberOfSessions, 0);

      // Add a conditional check here to exclude courses with totalNumberOfSessionsPurchased equal to zero
      if (totalNumberOfSessionsPurchased === 0) {
        return null; // Skip this course
      }

      // Filter sessionsData to find sessions that match the courseId of the current course
      const matchingSessions = sessionsData.filter((session) => session.courseId === course.id);

      // Calculate the number of remaining sessions
      const remainingSession = totalNumberOfSessionsPurchased - matchingSessions.length;

      // Find the most recent session with a packagePurchasedId
      const mostRecentSessionWithPkgId = matchingSessions.find((session) => session.packagePurchasedId !== null);

      // Extract the packagePurchasedId from the most recent session found
      const packagePurchasedId = mostRecentSessionWithPkgId ? mostRecentSessionWithPkgId.packagePurchasedId : null;

      // Return a new object that includes all the original data from course, plus the remainingSession and packagePurchasedId
      return {
        ...course,
        remainingSession,
        packagePurchasedId,
      };
    });

    const filteredCourses = coursesWithRemainingSession.filter((course) => course && course.remainingSession === 0);

    const data = filteredCourses.filter((course) => {
      for (const courseStudent of course.courseStudent) {
        const payerId = courseStudent.payer.id;
        if (
          emailLogPackagePurchasedIds.some(
            (log) => log.packagePurchasedId === course.packagePurchasedId && log.payerId === payerId
          )
        ) {
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

          Congratulations on completing your learning package with ${course.teacher.user.firstname} ${course.teacher.user.lastname} for the ${course.topic.name} class!  We're so proud of your progress and the amazing things you've achieved.<br/><br/>

          Ready to continue your learning journey? Renew your package with ${course.teacher.user.firstname} ${course.teacher.user.lastname} directly on their <a href='https://darsoon.com/tutors/${course.teacher.wixProfileNumber}'>profile page</a> or through the "Courses" section of your <a href="https://dashboard.darsoon.com">dashboard</a>. Choose a package that fits your needs and schedule your next sessions with your tutor easily!<br/><br/>

          Best regards,<br/><br/>

          <img src='https://s30.picofile.com/file/8473131318/_%D8%AC%D8%B4%D9%86_%D9%86%D9%88%D8%B1%D9%88%D8%B2%DB%8C_1200_x_300_px_.png' alt='ٌWorkshop' width='100%' /><br/><br/>

          <a href='https://www.darsoon.com/service-page/%D8%AC%D8%B4%D9%86-%D8%A2%D9%86%D9%84%D8%A7%DB%[…]3%DB%8C-%D8%B2%D8%A8%D8%A7%D9%86?referral=service_list_widget' style='color: white; background-color: orange; padding: 8px 16px; font-weight: bold;'>ثبت‌نام رایگان</a><br /><br />
`;
          const mailOptions = {
            from: "szamanpour@darsoon.com",
            to: payerEmail,
            subject: `End of package/ Renew your lessons with ${course.teacher.user.firstname} ${course.teacher.user.lastname}!`,
            html: emailBody,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent successfully for course ID: ${courseId}`);
          const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format "YYYY-MM-DD"
          await supabase.from("dashboardGeneralMailLog").insert([
            {
              courseId: courseId,
              date: currentDate,
              packagePurchasedId: course.packagePurchasedId,
              emailBody: emailBody,
              payerId: payer.id,
              isArchived: false,
            },
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
