import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { renderNoData } from "@/components/RenderQ";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import Image from "next/image";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useEffect, useState } from "react";
import LoginBox from "@/components/LoginBox";
import IntroductoryMeetingModal from "@/components/IntroductoryMeetingModal";
import SignUpBox from "@/components/SignUpBox";
import Button from "@/components/ui/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import persianJs from "persianjs";
import Price from "@/components/ui/price";
import Modal from "@/components/ui/modal";
import BookingModalContent from "@/components/BookingModalContent";
import { En, Fa } from "@/components/ui/multilang";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Snack from "@/components/ui/Snack";
import RegisterNewStudents from "@/components/RegisterNewStudents";
import Space from "@/components/ui/Space";
import { DCategory, DCourse, DExpertise, DFeedback, DSiteProfile, DStudent, DTopic, DUser } from "@/types";
import Icon from "@/components/ui/Icon";
import ReviewsSection from "@/components/page-sections/tutor-profile/ReviewSection";
import { categorySlugs } from "@/constants/categories";
import StarRating from "@/components/ui/StarRating";
import { calculateTeacherRating } from "../classes/[[...slug]]";
import LoginOrSignUpBox from "@/components/LoginOrSignUpBox";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type StudentQType = Pick<DStudent, "payerId"> & { user: Pick<DUser, "firstname" | "lastname"> };

type ProfileQType = DSiteProfile & { topic: Pick<DTopic, "name" | "nameFa"> } & {
  teacher: {
    expertise: Pick<DExpertise, "sessionPriceInCAD" | "sessionDurationOnWebsiteInMinute">;
  } & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };
} & { category: Pick<DCategory, "id" | "name" | "nameFa"> };

type ReviewQType = DFeedback & { course: Pick<DCourse, "teacherId"> } & {
  payer: { user: Pick<DUser, "firstname" | "lastname"> };
};

type CourseQType = Pick<DSiteProfile, "id" | "teacherId" | "topicId" | "categoryId"> & {
  teacher: {
    expertise: Pick<DExpertise, "sessionDurationOnWebsiteInMinute" | "endDate">;
  } & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };
} & { topic: Pick<DTopic, "name" | "nameFa"> };

type PrevCourseQType = Pick<
  DCourse,
  "id" | "requestedSessionDurationInMinute" | "numberOfStudents" | "payerId" | "teacherId"
> & {
  teacher: {
    expertise: Pick<DExpertise, "id" | "endDate" | "sessionPriceInCAD" | "sessionDurationOnWebsiteInMinute">;
  } & { courseStudent: { student: { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> } } };
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common", "tutors", "header", "footer"])),
    },
  };
}

export default function ProfilePage() {
  const userMeQ = useGetUserMe();

  const studentQ = useQuery<StudentQType[]>({
    queryKey: ["studentChecker"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("student")
        .select(`payerId, user(firstname, lastname)`)
        .eq("payerId", userMeQ.data?.payer.id);
      if (error) throw error;
      return data;
    },
    enabled: userMeQ.isSuccess && !!userMeQ.data?.isPayer,
  });

  const router = useRouter();
  const { locale } = router;
  const { profileId } = router.query;
  const supabase = useSupabaseClient();

  const profileQ = useQuery<ProfileQType>({
    queryKey: ["siteProfileTutor", profileId],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("siteProfile")
        .select(
          `*, teacher(
          expertise(sessionDurationOnWebsiteInMinute, sessionPriceInCAD),
          user(firstname, lastname, firstnameFa, lastnameFa),
          course(feedback(studentRating))
          ), 
          topic(name, nameFa), 
          category (id , name , nameFa)
          `
        )
        .eq("id", profileId)
        .is("teacher.expertise.endDate", null)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const reviewQ = useQuery<ReviewQType[]>({
    queryKey: ["reviewNewWebsite", profileId],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("feedback")
        .select(`*, course!inner(teacherId), payer(user(firstname, lastname))`)
        .filter("course.teacherId", "eq", profileQ.data.teacherId)
        .not("studentFeedback", "eq", "");
      if (error) throw error;
      return data;
    },
    enabled: !!profileQ?.data?.teacherId,
  });

  const courseQ = useQuery<CourseQType>({
    queryKey: ["bookingModalRequest-1"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("siteProfile")
        .select(
          `id, teacherId, topicId, teacher(expertise(sessionDurationOnWebsiteInMinute, endDate),user(firstname, lastname, firstnameFa, lastnameFa)), topic(name, nameFa), categoryId`
        )
        .eq("id", profileId)
        .is("teacher.expertise.endDate", null)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const prevCourseQ = useQuery<PrevCourseQType[]>({
    queryKey: ["bookingPrevCourses-2"],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("course")
        .select(
          `id, requestedSessionDurationInMinute, numberOfStudents, payerId, teacherId, teacher(expertise(id, endDate, sessionPriceInCAD, sessionDurationOnWebsiteInMinute)), courseStudent(student(user(firstname, lastname, firstnameFa, lastnameFa)))`
        )
        .eq("payerId", userMeQ.data?.payer.id)
        .eq("teacherId", courseQ.data?.teacherId)
        .is("teacher.expertise.endDate", null);
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id && !!courseQ.data?.teacherId,
  });

  const categoryName = profileQ.data?.category?.name;
  const categoryId = profileQ.data?.category?.id;

  const categorySlug = categoryId ? categorySlugs[categoryId] : "";
  const breadcrumbSteps = [
    { title: "Home", href: "" },
    { title: "Classes", href: "/classes" },
    { title: categoryName ?? "Category", href: `/classes/${categorySlug}` },
    { title: profileQ.data?.topic?.name ?? "Topic", href: `/profile/${profileId}` },
  ];
  return (
    <div className="max-w-70rem mx-auto ">
      <Breadcrumb steps={breadcrumbSteps} />
      <div className="h-4"></div>
      {renderNoData(profileQ) ?? (
        <div className="  gap-8 w-full max-w-full    ">
          <HeaderSection profileQ={profileQ} />
          <ClassInformationCard
            profileQ={profileQ}
            userMeQ={userMeQ}
            studentQ={studentQ}
            reviewQ={reviewQ}
            courseQ={courseQ}
            prevCourseQ={prevCourseQ}
          />
          <div className="">
            <AboutSection userMeQ={userMeQ} profileQ={profileQ} />
            {/* <ClassesLikeThis /> */}
          </div>
          <ReviewsSection reviewQ={reviewQ} prevCourseQ={prevCourseQ} />
        </div>
      )}
    </div>
  );
}

function HeaderSection({ profileQ }) {
  const router = useRouter();
  const { profileId } = router.query;
  const supabase = useSupabaseClient();
  const { t } = useTranslation();

  return (
    <section className="" style={{ gridColumn: 1 / 2, gridRow: 1 / 2 }}>
      <div className="flex gap-4  sm:gap-6  w-full   ">
        <div className="  flex">
          <Image
            src={`${supabase.storage.from("teacher").getPublicUrl(`photo/${profileId}`).data.publicUrl}`}
            alt={getFullName(profileQ.data.teacher.user)}
            width={450}
            height={450}
            className="rd-4 sm:rd-6 w-40 h-40 sm:w-60 sm:h-60 block bg-sand4 shd-tinted-2 object-cover b-2 b-white"
          />
        </div>
        <div className="grow">
          <Space size="h-2 sm:h-4" />
          <h1 className="H1 !fw-700 text-3xl sm:text-5xl">
            <Fa>{profileQ.data.topic.nameFa}</Fa>
            <En>{profileQ.data.topic.name}</En>
          </h1>
          <div className="fs-2xl">
            <StarRating number={calculateTeacherRating(profileQ.data)} />
          </div>
          <Space size="sm:h-4" />
          <div className="sm:text-lg grid sm:gap-0.5">
            <p className=" c-sand11 flex items-baseline">
              <Icon name="bf-i-ph-chalkboard-teacher" className="mie-2 sm:mie-3" />
              <Fa>
                <span className="leading-6  ">{getFullNameFa(profileQ.data.teacher.user)}</span>
              </Fa>
              <En>
                <span className="leading-4 ">{getFullName(profileQ.data.teacher.user)}</span>
              </En>
            </p>

            <p className="flex items-baseline">
              <Icon name="bf-i-ph-timer" className="mie-2 sm:mie-3" />

              <span className="c-sand11">
                {t("tutors:duration")}:{" "}
                <Fa>
                  {profileQ.data.teacher.expertise[0]?.sessionDurationOnWebsiteInMinute &&
                    persianJs(profileQ.data.teacher.expertise[0].sessionDurationOnWebsiteInMinute.toString())
                      .englishNumber()
                      .toString()}
                </Fa>
                <En>{profileQ.data.teacher.expertise[0]?.sessionDurationOnWebsiteInMinute}</En> {t("tutors:min")}
              </span>
            </p>
            <p className="flex items-baseline">
              <Icon name="bf-i-ph-currency-dollar-simple" className="mie-2 sm:mie-3" />

              <span className="c-sand11">
                {t("tutors:price")}:{" "}
                <Price>
                  <Fa>
                    {profileQ.data.teacher.expertise[0]?.sessionPriceInCAD &&
                      persianJs(profileQ.data.teacher.expertise[0].sessionPriceInCAD.toString())
                        .englishNumber()
                        .toString()}
                  </Fa>
                  <En>{profileQ.data.teacher.expertise[0]?.sessionPriceInCAD}</En>
                </Price>
              </span>
            </p>
            <p className="flex items-baseline">
              <Icon name="bf-i-ph-baby" className="mie-2 sm:mie-3" />
              <span className="c-sand11">
                {t("tutors:age")}:{` `}
                <Fa>{profileQ.data.studentRangeFa}</Fa>
                <En>{profileQ.data.studentRange.join(", ")}</En>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Video() {
  const router = useRouter();
  const { profileId } = router.query;
  const supabase = useSupabaseClient();

  return (
    <video width="640" height="480" controls className="rd-xl shadow-xl bg-sand7 w-full max-w-full aspect-16/9 ">
      <source
        src={`${supabase.storage.from("teacher").getPublicUrl(`video/${profileId}`).data.publicUrl}`}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
}

function ClassInformationCard({ profileQ, userMeQ, studentQ, reviewQ, courseQ, prevCourseQ }) {
  const router = useRouter();
  const { locale } = router;

  const { t } = useTranslation();

  return (
    <div className="" style={{ gridRow: " span 2" }}>
      <div className="">
        <div className="flex flex-col gap-1  ">
          <div className="h-4"></div>
          <Fa>{profileQ.data.availability && <Snack variant="warning">{profileQ.data.availability}</Snack>}</Fa>
          <En>{profileQ.data.availability && <Snack variant="warning">{profileQ.data.availability}</Snack>}</En>
          {profileQ.data.isTeacherIn && (
            <>
              <div className="h-2"></div>

              <div className="flex justify-center flex-wrap  gap-4  rd-6   w-full">
                <Modal
                  trigger={
                    <Button
                      variation="solid-prm"
                      disabled={!profileQ.data.isActive}
                      className="text-lg flex-1 grow py-4 flex items-center justify-center"
                    >
                      <Icon name="bf-i-ph-chalkboard-teacher before:opacity-100 mie-2" />
                      {t("tutors:introductory")}
                    </Button>
                  }
                >
                  {userMeQ.isFetching && <LoadingSpinner wrapped />}
                  {!userMeQ.data && <LoginOrSignUpBox />}
                  {userMeQ.data && !userMeQ.data?.isPayer && (
                    <p>You Should be a payer to buy this class. Contact Admins Please.</p>
                  )}
                  {userMeQ.data?.isPayer && studentQ.data && studentQ.data.length === 0 && <RegisterNewStudents />}
                  {userMeQ.data?.isPayer && studentQ.data && studentQ.data.length > 0 && (
                    <IntroductoryMeetingModal courseQ={courseQ} />
                  )}
                </Modal>

                <Modal
                  trigger={
                    <Button
                      variation="soft"
                      disabled={!profileQ.data.isBuyButtonActive}
                      className="text-lg flex-1 grow py-4 flex items-center justify-center"
                    >
                      <Icon name="bf-i-ph-calendar mie-2" />
                      {t("tutors:booking")}
                    </Button>
                  }
                >
                  {userMeQ.isFetching && <LoadingSpinner wrapped />}
                  {!userMeQ.data && <LoginOrSignUpBox />}
                  {userMeQ.data && !userMeQ.data?.isPayer && (
                    <p>You Should be a payer to buy this class. Contact Admins Please.</p>
                  )}
                  {userMeQ.data?.isPayer && studentQ.data && studentQ.data.length === 0 && <RegisterNewStudents />}
                  {userMeQ.data?.isPayer && studentQ.data && studentQ.data.length > 0 && (
                    <BookingModalContent courseQ={courseQ} prevCourseQ={prevCourseQ} />
                  )}
                </Modal>
                <Button variation="soft" className="text-lg flex-1 grow py-4 flex items-center justify-center">
                  <Icon name="bf-i-ph-gift mie-2" />
                  <En>Gift this Course</En>
                  <Fa>این کلاس را هدیه بدهید </Fa>
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="h-12"></div>
      </div>
    </div>
  );
}

function AboutSection({ userMeQ, profileQ }) {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className=""></div>
      <section className="">
        <Video />
        <div className="max-w-50rem mx-auto  ">
          <div className="h-12 "></div>
          <h2 className="H3 !fw-700 c-sand11">{t("tutors:about")}</h2>
          <div className="h-1"></div>
          <p className="">
            <Fa>{profileQ.data.aboutFa}</Fa>
            <En>{profileQ.data.about}</En>
          </p>
          <div className="h-12 "></div>
          {profileQ.data.teachingMethod && (
            <>
              <h2 className="H3 !fw-700 c-sand11">{t("tutors:method")}</h2>
              <div className="h-1"></div>
              <p className="">
                <Fa>{profileQ.data.teachingMethodFa}</Fa>
                <En>{profileQ.data.teachingMethod}</En>
              </p>
            </>
          )}
          <div className="h-12 "></div>
          {profileQ.data.teachingMethod && (
            <>
              <h2 className="H3 !fw-700 c-sand11">{t("tutors:experience")}</h2>
              <div className="h-1"></div>
              <p>
                <Fa>{profileQ.data.publicExperienceFa}</Fa>
                <En>{profileQ.data.publicExperience}</En>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
