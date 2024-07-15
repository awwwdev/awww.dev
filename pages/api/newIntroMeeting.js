import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const sendScheduledEmail = async (req, res) => {
  try {
    const { data: availableCourses, error } = await supabase
      .from("course")
      .select(`id, isWorkshop, requestMessage, teacher(user(*)), topic(name), courseStudent(payer(user(*)), student(user(*)))`)
      .eq("isWorkshop", false);

    if (error) throw error;
    // Get the list of course IDs that are already present in the "introMeetingMailLog" table
    const { data: emailLogData, error: emailLogError } = await supabase
      .from("newIntroMeetingMailLog")
      .select("courseId");

    if (emailLogError) throw emailLogError;

    // Extract the list of course IDs from the email log data
    const emailLogCourseIds = emailLogData.map((log) => log.courseId);

    // Filter out the courses that have already been sent emails
    const data = availableCourses.filter((course) => !emailLogCourseIds.includes(course.id));

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
        const payerNames = course.courseStudent
          .map((cs) => `${cs.payer.user.firstnameFa} ${cs.payer.user.lastnameFa}`)
          .join(", ");
        const payerPhones = course.courseStudent
          .map((cs) => `${cs.payer.user.phoneCountryCode ? cs.payer.user.phoneCountryCode : ""}${cs.payer.user.phone}`)
          .join(", ");
        const payerEmails = course.courseStudent.map((cs) => cs.payer.user.email).join(", ");

        const emailBody = `${course.teacher.user.firstnameFa} ${course.teacher.user.lastnameFa} عزیز، سلام<br/>
          درسون یک درخواست جدید برای کلاس شما دریافت کرده، علاوه‌بر ثبت مشخصات شاگرد در دشبورد شخصی خودتان در <strong><a href='https://dashboard.darsoon.com'>این لینک</a></strong>، برای راحتی شما اطلاعات این درخواست را اینجا هم قرار می‌دهیم.<br/><br/>


          نام شاگرد: <strong>${course.courseStudent
            .map((cs) => cs.student.user.firstnameFa + " " + cs.student.user.lastnameFa)
            .join(", ")}</strong><br/>
          نام درخواست‌دهنده: <strong>${payerNames}</strong><br/>
          شمارهٔ متصل به واتساپ: <strong>${payerPhones}</strong><br/>
          ایمیل: <strong>${payerEmails}</strong><br/>
          پیام: <strong>${course.requestMessage ? course.requestMessage : "-"}</strong><br/><br/>


          لطفاً اگر دسترسی به واتساپ دارید، از این طریق برای هماهنگی جلسهٔ معارفه اقدام کنید، اولویت دوم هماهنگی از طریق ایمیل شاگرد است.<br/><br/>


          اگر سؤالی داشتید لطفاً ازطریق پاسخ به همین ایمیل یا ارسال پیامک به شمارهٔ ۰۹۳۵۲۵۰۴۳۲۳ ما را در جریان قرار دهید<br/><br/>


          با احترام<br/>
          تیم اجرایی درسون
          `;
        const mailOptions = {
          from: "zmoghadasian@darsoon.com",
          to: course.teacher.user.email,
          subject: "درسون - جلسهٔ معرفی جدید",
          html: emailBody,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully for course ID: ${course.id}`);
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in the format "YYYY-MM-DD"
        await supabase
          .from("newIntroMeetingMailLog")
          .insert([{ courseId: course.id, date: currentDate, emailBody: emailBody, isArchived: false }]);
        console.log(`Log entry added for course ID: ${course.id}`);
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
