import { renderNoData } from "@/components/RenderQ";
import useGetUserMe from "@/hooks/useGetUserMe";
import { getFullName } from "@/utils/formatter";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import Link from "next/link";

const schema = z.object({
  studentRating: z
    .string()
    .min(1, "Must not be less than 1")
    .max(1, "Must not be more than 5")
    .regex(/(1|2|3|4|5)/, "Please rate from 1 to 5. "),
  studentFeedback: z
    .string({ required_error: "Firstname is required" })
    .max(1000, "Message can not be longer that 1000 characters.")
    .optional()
    .nullable(),
});

const Page = () => {
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const queryClient = useQueryClient();
  const [addedFeedback, setAddedFeedback] = useState(null);

  const router = useRouter();
  const { courseId } = router.query;
  const courseQ = useQuery({
    queryKey: ["coursePayerDash-70", courseId],
    enabled: !!courseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(
          `*,
      topic (name),
      teacher (*, user(*)),
      courseStudent (*, payer (*, user (*)) , student (* , user (*))),
      packagePurchased (numberOfSessions),
      session (id),
      feedback(*)`
        )
        .match({ id: courseId })
        .single();
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (formValues) => {
    const feedback = {
      ...formValues,
      courseId: courseId,
      payerId: userMeQ.data?.payer.id,
      idInSheet: `NOT IN THE SHEET ${Date.now()}`,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.id,
    };

    const { data, error } = await supabase.from("feedback").insert(feedback).select().single();
    if (error) throw new Error("Could not insert the feedback. Please try again. | error details: " + error.message);
    queryClient.invalidateQueries({ queryKey: ["feedback", data.id] });
    setAddedFeedback(data);
  };

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: {
      studentRating: "0",
      studentFeedback: "",
    },
  });

  if (addedFeedback) {
    return renderNoData(courseQ) ?? <SuccessScreen feedback={addedFeedback} course={courseQ.data} />;
  }

  return (
    <div>
      <h1 className="H1">
        Write a feedback <span className="fw-200"> for the course you have</span>
      </h1>
      {renderNoData(courseQ) ?? renderNoData(userMeQ) ?? (
        <>
          <div className="my-8">
            <Form form={form} submitText="Submit Feedback">
              <fieldset className="mb-2">
                <legend className="c-sand11 fw-500 block capitalize">
                  Rating:
                  <sup className="c-red11"> *</sup>
                </legend>
                <div className="mt-2 flex gap-1 c-accent-9 text-3xl">
                  <label
                    className={`before:opacity-100 ${
                      Number(form.watch("studentRating")) >= 1 ? "bf-i-ph-star-fill" : "bf-i-ph-star"
                    }`}
                  >
                    <input value="1" type="radio" className="sr-only" {...form.register("studentRating")} />
                  </label>
                  <label
                    className={`before:opacity-100 ${
                      Number(form.watch("studentRating")) >= 2 ? "bf-i-ph-star-fill" : "bf-i-ph-star"
                    }`}
                  >
                    <input value="2" type="radio" className="sr-only" {...form.register("studentRating")} />
                  </label>
                  <label
                    className={`before:opacity-100 ${
                      Number(form.watch("studentRating")) >= 3 ? "bf-i-ph-star-fill" : "bf-i-ph-star"
                    }`}
                  >
                    <input value="3" type="radio" className="sr-only" {...form.register("studentRating")} />
                  </label>
                  <label
                    className={`before:opacity-100 ${
                      Number(form.watch("studentRating")) >= 4 ? "bf-i-ph-star-fill" : "bf-i-ph-star"
                    }`}
                  >
                    <input value="4" type="radio" className="sr-only" {...form.register("studentRating")} />
                  </label>
                  <label
                    className={`before:opacity-100 ${
                      Number(form.watch("studentRating")) >= 5 ? "bf-i-ph-star-fill" : "bf-i-ph-star"
                    }`}
                  >
                    <input value="5" type="radio" className="sr-only" {...form.register("studentRating")} />
                  </label>
                </div>
              </fieldset>
              <ErrMsg name="studentRating" />
              <label className="mt-8">
                <span className="mb-2 c-sand11 fw-500 block capitalize">Feedback Message</span>
                <textarea
                  rows={5}
                  {...form.register("studentFeedback")}
                  aria-invalid={form?.formState?.errors?.studentFeedback ? "true" : "false"}
                  className="field mb-2 p-4 block min-w-40 w-full rd-xl resize-both"
                  placeholder="Write your feedback message here..."
                ></textarea>
                <ErrMsg name="studentFeedback" />
              </label>
            </Form>
          </div>
          {addedFeedback && (
            <div>
              <div className="snack-success">
                <p className="H1 ">The Record is successfully added to the database. </p>
              </div>
              <p>
                <span className="H3 ">Added Record:</span>
                <br />
                <pre>{JSON.stringify(addedFeedback, null, 2)}</pre>
              </p>
              <p>You can add more records by filling out the form again.</p>
            </div>
          )}
          {renderNoData(courseQ) ?? (
            <div className="c-sand11">
              <h2 className="H3 c-sand11">Course Info</h2>
              <p>Teacher: {getFullName(courseQ.data.teacher.user)}</p>
              <p>Students: {courseQ.data?.courseStudent?.map((cs) => getFullName(cs?.student?.user)).join(", ")}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;

const SuccessScreen = ({ feedback, course }) => {
  const teacher = course?.teacher;

  return (
    <section className="space-y-6">
      <p className="snack-success">Your feedback is added successfully</p>
      <div className="space-y-2">
        <p>Rating: {feedback.studentRating}</p>
        <p>Feedback Message: </p>
        <p className="text-note p-4 rd-xl b-1 b-gray5 bg-gray2">{feedback.studentFeedback}</p>
        Course Information:
        <div className="text-note p-4 rd-xl b-1 b-gray5 bg-gray2 space-y-2">
          <p>Teacher Name: {teacher ? teacher?.user?.firstname + " " + teacher?.user?.lastname : null}</p>
          <p>Students: {course?.courseStudent?.map((cs) => getFullName(cs?.student?.user)).join(", ")}</p>
        </div>
      </div>
      {/*       <pre className="rd-xl b-1 b-dashed b-gray5 bg-gray2 c-sand11 p-4">{JSON.stringify(feedback, null, 2)}</pre> */}
      {/* <pre className="rd-xl b-1 b-dashed b-gray5 bg-gray2 c-sand11 p-4">
        {JSON.stringify(packagePurchased, null, 2)}
      </pre> */}
      <Link href="/payer-dashboard/courses" className="btn-accent bf-i-ph-arrow-u-up-left">
        Go Back
      </Link>
    </section>
  );
};
