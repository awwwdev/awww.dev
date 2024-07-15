import { renderNoData } from "@/components/RenderQ";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import persianJs from "persianjs";
import LinkButton from "@/components/ui/button/LinkButton";
import { En, Fa } from "@/components/ui/multilang";
import FAQItem from "@/components/ui/FAQItem";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import BluredCircle from "./BluredCircle";
import Icon from "@/components/ui/Icon";

export default function FAQ() {
  const { locale } = useRouter();
  return (
    <section className="relative ">
      <BluredCircle radius={100} top="20%" left="95%" bg="bg-brand-light-amber" blur="200px" />
      <BluredCircle radius={200} top="60%" left="5%" bg="bg-brand-light-blue" blur="200px" />
      <div className="mx-auto max-w-70rem">
        <h2 className="H2 c-title">
          <En>FAQ</En>
          <Fa>پرسش‌های رایج</Fa>
        </h2>
        <div className="h-8"></div>
        <div className="grid ">
          <FAQItem
            number="1"
            question={
              locale === "en"
                ? "How do I find a tutor and take lessons in Darsoon?"
                : "چگونه معلم مورد نظرم را انتخاب کنم و با او در درسون کلاس بگیرم؟"
            }
          >
            <En>
              <p>
                You first select your preferred tutor on the Darsoon website and complete the introductory meeting
                request form. We will give your contact information to the tutor and ask him/her to contact you to
                schedule the introductory meeting. The tutor may contact you by WhatsApp or email.{" "}
              </p>
              <p>
                Once you both agree that there is a perfect match, you can go ahead and make payments on the
                tutor&apos;s profile page on Darsoon website. The cost listed on the website is for when you purchase
                the 5 or 12-session package. If you purchase a single-session package the cost is 15% higher, whereas
                you receive a 5% discount if you purchase a 20-session package.
              </p>
              <p>You can schedule your sessions directly with the tutor once you make the payment.</p>
            </En>
            <Fa>
              <p>
                شما ابتدا معلم خود را در وبسایت درسون انتخاب می‌کنید و فرم درخواست جلسه‌ی معرفی را کامل می‌کنید. ما
                اطلاعات تماس شما را به معلم می‌دهیم و از او می‌خواهیم که با شما تماس بگیرد و زمان جلسه‌ی معرفی را هماهنگ
                کند. روش تماس معلم با شما استفاده واتساپ یا ایمیل است.
              </p>
              <p>
                زمانی که هر دو به توافق رسیدید، می توانید پرداخت را در صفحه پروفایل معلم در وب‌سایت درسون انجام دهید.
                هزینه‌ی درج شده در وبسایت مربوط به زمانی است که شما بسته‌ی 5 یا 12 جلسه‌ای را تهیه کنید. هزینه‌ی تک‌جلسه
                15% بیشتر از هزینه‌ی درج شده در وبسایت و هزینه‌ی بسته 20 جلسه‌ای 5% کمتر است.
              </p>
              <p>شما می‌توانید زمان جلسات بعدی را با معلم به طور مستقیم هماهنگ کنید.</p>
            </Fa>
          </FAQItem>
          <FAQItem
            number="2"
            question={locale === "en" ? "What is the free introductory meeting?" : "منظور از جلسه معرفی رایگان چیست؟"}
          >
            <En>
              <p>
                A free introductory meeting is a short 15-minute video call that gives you and the tutor a chance to get
                to know each other better. During this session, you can discuss the tutor&apos;s teaching style, your
                own needs, and anything else that is important to you. After that, you can make a more informed decision
                about whether or not to purchase a package to start classes.
              </p>
              <p>In this session, the tutor will not be teaching. It is simply a chance to get to know the tutor.</p>
            </En>
            <Fa>
              <p>
                جلسه معرفی رایگان یک جلسه گفتگوی تصویری کوتاه حدود 15 دقیقه‌ای است که فرصتی برای شما و معلم فراهم می‌کند
                تا بیشتر با یکدیگر آشنا شوید. در این جلسه می‌توانید در مورد شیوه تدریس معلم، شرایط خودتان و هر موضوع
                دیگری که برایتان مهم است صحبت کنید. بعد از آن، شما می‌توانید با اطلاعات کامل‌تر تصمیم بگیرید که آیا برای
                شروع کلاس، پکیجی را خریداری کنید یا خیر.
              </p>
              <p>در این جلسه معلم تدریس نمی‌کند و صرفاً یک جلسه آشنایی با معلم خواهید داشت.</p>
            </Fa>
          </FAQItem>
          <FAQItem
            number="3"
            question={locale === "en" ? "What are the cancellation rules?" : "قوانین تغییر زمان یا لغو کلاس چه هستند؟"}
          >
            <En>
              <p>
                You can change the time of your class up to 24 hours before the start of the class by contacting the
                tutor and coordinating with him/her.
              </p>
            </En>
            <Fa>
              <p>شما تا 24 ساعت قبل از شروع کلاس می‌توانید با تماس با معلم و هماهنگی با وی زمان کلاس را تغییر دهید.</p>
            </Fa>
          </FAQItem>
        </div>

        <div className="h-4"></div>
        <Link href="/faq" className="flex justify-end items-center text-sm">
          <En>
            All frequently asked questions
            <Icon name="bf-i-ph-arrow-right mis-1" />
          </En>
          <Fa>
            همه پرسش‌های رایج
            <Icon name="bf-i-ph-arrow-left mis-1" />
          </Fa>
        </Link>
      </div>
    </section>
  );
}
