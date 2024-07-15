import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { renderNoData } from "@/components/RenderQ";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import Image from "next/image";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useEffect, useState } from "react";
import LoginBox from "@/components/LoginBox";
import SignUpBox from "@/components/SignUpBox";
import Button from "@/components/ui/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import persianJs from "persianjs";
import Price from "@/components/ui/price";
import Modal from "@/components/ui/modal";
import { En, Fa } from "@/components/ui/multilang";
import AddStudentsForm from "@/components/RegisterNewStudents";
import WorkshopModal from "@/components/WorkshopModal";
import { DCourse, DStudent, DUser, DWorkshopInfo } from "@/types";
import Icon from '@/components/ui/Icon';

type StudentQType = Pick<DStudent, "payerId"> & { user: Pick<DUser, "firstname" | "lastname"> };

type WorkshopQType = DCourse & {
  workshopInfo: DWorkshopInfo[];
  teacher: { user: Pick<DUser, "firstname" | "lastname"> };
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

  const studentQ = useQuery<StudentQType[], Error>({
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
  const { workshopId } = router.query;
  const supabase = useSupabaseClient();

  const workshopQ = useQuery<WorkshopQType>({
    queryKey: ["workshopNewWebsite-1", workshopId],
    queryFn: async () => {
      const { data, error }: any = await supabase
        .from("course")
        .select(`*, teacher(user(firstname, lastname)), workshopInfo(*)`)
        .match({ id: workshopId })
        .single();
      if (error) throw error;
      return data;
    },
    // enabled: !!categoryId && !!subcategoryId
  });

  useEffect(() => {
    if (workshopQ.data) {
      console.log(workshopQ.data);
    }
  });

  /* const prevCourseQ = useQuery({
    queryKey: ["bookingPrevCourses-2"],
    queryFn: async () => {
      const { data, error } = await supabase
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
  }); */

  return (
    <div className="max-w-page mx-auto ">
      {renderNoData(workshopQ) ?? (
        <div className=" grid gap-8 with-sidebar w-full max-w-full    ">
          <HeaderSection workshopQ={workshopQ} />
          <ClassInformationCard
            workshopQ={workshopQ}
            userMeQ={userMeQ}
            studentQ={studentQ}
            /* prevCourseQ={prevCourseQ} */
          />
          <div className="">
            <AboutSection userMeQ={userMeQ} workshopQ={workshopQ} />
          </div>
        </div>
      )}
    </div>
  );
}

function HeaderSection({ workshopQ }) {
  const router = useRouter();
  const { workshopId } = router.query;
  const supabase = useSupabaseClient();

  return (
    <section className="" style={{ gridColumn: 1 / 2, gridRow: 1 / 2 }}>
      <Fa>
        <div className="h-3"></div>
      </Fa>
      <h1 className="H1 text-7xl">
        <Fa>{workshopQ.data.workshopInfo[0].name}</Fa>
        <En>{workshopQ.data.workshopInfo[0].name}</En>
      </h1>
      <div className="h-3"></div>
      <Fa>
        <div className="h-3"></div>
      </Fa>
      <div className="flex gap-4 items-center">
        <Image
          src={`${supabase.storage.from("teacher").getPublicUrl(`photo/${workshopId}`).data.publicUrl}`}
          alt={getFullName(workshopQ.data.teacher.user)}
          width={225}
          height={225}
          className="rd-full w-20 h-20 block shadow-xl"
        />
        <Fa>
          <p className="leading-6  c-sand11">
            <span className="">با آموزش </span>
            <br />
            <span className="text-3xl fw-700">{getFullNameFa(workshopQ.data.teacher.user)}</span>
          </p>
        </Fa>
        <En>
          <p className="leading-4  c-sand11">
            <span className="c-sand11">A Course by{` `}</span>
            <br />
            <span className="text-3xl fw-700">{getFullName(workshopQ.data.teacher.user)}</span>
          </p>
        </En>
      </div>
    </section>
  );
}

function ClassInformationCard({ workshopQ, userMeQ, studentQ, reviewQ, courseQ, prevCourseQ }) {
  const router = useRouter();
  const { locale } = router;

  const { t } = useTranslation();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userMeQ.data);
  useEffect(() => {
    setIsLoggedIn(!!userMeQ.data);
  }, [userMeQ.data]);

  const handleLoginClick = () => {
    setIsNewUser(false);
  };

  const handleSignUpClick = () => {
    setIsNewUser(true);
  };

  return (
    <div className="" style={{ gridRow: " span 2" }}>
      <div className="sticky top-6">
        <p className="bf-i-ph-currency-dollar-simple">
          <span className="c-sand11">
            {t("tutors:price")}:{" "}
            <Price>
              <Fa>{persianJs(workshopQ.data.workshopInfo[0].price.toString()).englishNumber().toString()}</Fa>
              <En>{workshopQ.data.workshopInfo[0].price}</En>
            </Price>
          </span>
        </p>
        <div className="h-4"></div>
        <div className="h-2"></div>

        <div className="grid flex-wrap gap-2">
          <Modal
            trigger={
              <Button
                variation="solid-accent"
                /* disabled={!profileQ.data.isActive} */ className="btn-ghost-accent text-lg flex-1"
              >
                <Icon name="bf-i-ph-chalkboard-teacher before:opacity-100 mie-2"/>
                Enroll
              </Button>
            }
          >
            {(!isLoggedIn || !userMeQ.data?.isPayer) && (
              <>
                <div className="flex justify-between pb-4">
                  <button onClick={handleLoginClick} className={`px-4 ${!isNewUser && "text-orange-500 font-bold"}`}>
                    Login
                  </button>
                  <button onClick={handleSignUpClick} className={`px-4 ${isNewUser && "text-orange-500 font-bold"}`}>
                    Sign Up
                  </button>
                </div>
                {!isNewUser && <LoginBox />}
                {isNewUser && <SignUpBox />}
              </>
            )}
            {studentQ.data && studentQ.data.length === 0 && userMeQ.data?.isPayer && <AddStudentsForm />}
            {studentQ.data && studentQ.data.length > 0 && userMeQ.data?.isPayer && (
              <WorkshopModal courseId={workshopQ.data.id} price={workshopQ.data.workshopInfo[0].price} />
            )}
          </Modal>
        </div>
      </div>
      <div className="h-12"></div>
    </div>
  );
}

function AboutSection({ userMeQ, workshopQ }) {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className=""></div>
      <section className="">
        {/* <Video /> */}
        <div className="h-12 "></div>
        <h2 className="H3 c-sand11">{t("tutors:about")}</h2>
        <div className="h-1"></div>
        <p className="">
          <Fa>{workshopQ.data.workshopInfo[0].description}</Fa>
          <En>{workshopQ.data.workshopInfo[0].description}</En>
        </p>
      </section>
    </div>
  );
}
