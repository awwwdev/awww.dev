import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useRouter } from "next/router";
import { renderNoData } from "./RenderQ";
import { getFullName, getFullNameFa } from "@/utils/formatter";
import { z } from "zod";
import { useState } from "react";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useTranslation } from "next-i18next";
import Space from "./ui/Space";
import { En, Fa } from "./ui/multilang";
import Snack from "./ui/Snack";
import Modal from "./ui/modal";
import Button from "./ui/button";

const queryKey = "courseIntroductory-1";
const tableName = "course";

export const schema = z.object({
  topicId: z.string().min(1, "Please enter topic ID here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  requestedSessionDurationInMinute: z.string().min(1, "Please enter class duration in minutes"),
  requestMessage: z.string().optional().nullable(),
  requestDate: z.string().min(1, "Please enter request date"),
  //rateOverwrite: z.string().optional().nullable(),
  payerId: z.string().min(1, "Please enter payer ID"),
  //isWorkshop: z.string().min(1, "Please enter number of students"),
  studentId: z.array(z.string()).nonempty({ message: "Can't be empty" }),
});

const IntroductoryMeetingModal = ({ courseQ }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = router;
  const { profileId } = router.query;
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();

  const studentQ = useQuery({
    queryKey: ["introductoryMeetingRequestStudents-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(`id, payerId, user(firstname, lastname, firstnameFa, lastnameFa)`)
        .eq("payerId", userMeQ.data?.payer.id);
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const now = new Date();
  const dateTimeString = now.toISOString().substring(0, 16);

  const [addedRecord, setAddedRecord] = useState(null);
  const onSubmit = async ({ studentId, ...formValues }) => {
    const correctFormValues = {
      ...formValues,
      requestMessage: formValues?.requestMessage === "" ? null : formValues?.requestMessage,
      //rateOverwrite: formValues?.rateOverwrite === "" ? null : formValues?.rateOverwrite,
      numberOfStudents: studentId.length,
      requestDate: formValues?.requestDate ? new Date(formValues?.requestDate) : null,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.payer.id,
    };
    const { data, error } = await supabase.from(tableName).insert(correctFormValues).select().single();
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    await Promise.all(
      studentId.map(async (id) => {
        const { data: csData, error: csError } = await supabase
          .from("courseStudent")
          .insert({ courseId: data.id, studentId: id, payerId: data.payerId })
          .select()
          .single();
        if (csError) throw csError;
      })
    );
    setAddedRecord(data);
  };

  const form = useFormHook({ schema, onSubmit });
  return (
    <div>
      <h2 className="H3">{t("tutors:intro.title")}</h2>
      <div className="flex justify-center">
        {renderNoData(courseQ) ?? renderNoData(userMeQ) ?? renderNoData(studentQ) ?? (
          <div className='w-full'>
            <Space size="h-4" />
            {/* <p>
            {t("tutors:intro.tutor")}:{" "}
            {locale === "fa" ? getFullNameFa(courseQ.data.teacher.user) : getFullName(courseQ.data.teacher.user)}{" "}
          </p>
          <p>
            {t("tutors:intro.subject")}: {locale === "fa" ? courseQ.data.topic.nameFa : courseQ.data.topic.name}
          </p> */}
            {!addedRecord && (
              <Form form={form} onSubmit={onSubmit} className="" hasSubmitButton={false}>
                <div className="hidden">
                  <Form.Input type="hidden" name="topicId" value={courseQ.data.topicId} required />
                  <Form.Input type="hidden" name="teacherId" value={courseQ.data.teacherId} required />
                  <Form.Input type="hidden" name="payerId" value={userMeQ.data.payer.id} required />
                  <Form.Input type="hidden" name="requestDate" value={dateTimeString} required />
                  <Form.Input
                    type="hidden"
                    name="requestedSessionDurationInMinute"
                    value={courseQ.data.teacher.expertise[0].sessionDurationOnWebsiteInMinute}
                    required
                  />
                </div>

                <Form.TextArea rows={4} name="requestMessage" label={t("tutors:intro.requestMessageLabel")} />

                {/* <Form.Input name="rateOverwrite" /> */}
                <fieldset>
                  <legend className="c-sand11 fw-500 capitalize">
                    {t("tutors:intro.student")}
                    <En>Which Student participate in this class?</En>
                    <Fa>کدام دانش‌اموزان در این کلاس شرکت می‌کنند؟</Fa>
                    <sup className="c-red11"> *</sup>
                  </legend>
                  <Space size="h-3" />
                  <label>
                    <input
                      {...form.register("studentId")}
                      type="checkbox"
                      name="studentId"
                      value={null}
                      disabled
                      className="inline hidden"
                    />
                  </label>
                  {studentQ.data.map((student) => {
                    return (
                      <label key={student.id}>
                        <input
                          {...form.register("studentId")}
                          type="checkbox"
                          name="studentId"
                          value={student.id}
                          className="inline"
                        />{" "}
                        {locale === "fa" ? getFullNameFa(student.user) : getFullName(student.user)}
                      </label>
                    );
                  })}
                </fieldset>
                <Space size="h-4" />
                <ErrMsg name="studentId" />
                <Form.ServerErrorMessage />
                <Form.SubmitButton width="parent">{t("tutors:intro.submit")}</Form.SubmitButton>
              </Form>
            )}

            {addedRecord && (
              <div>
                <Snack variant="success">
                  <p className="">{t("tutors:intro.successMessage")}</p>
                  <p>
                    <En>We will contact you soon.</En>
                    <Fa>به زودی با شما تماس می‌گیریم.</Fa>
                  </p>
                </Snack>
                <Space size="h-3"></Space>
                <Modal.Close className="w-full">
                  <Button variation="ghost" width="parent">
                    <En>Ok, Got it.</En>
                    <Fa>خیلی خب. باشه.</Fa>
                  </Button>
                </Modal.Close>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroductoryMeetingModal;
