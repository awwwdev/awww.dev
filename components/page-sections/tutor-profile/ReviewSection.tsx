import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useState } from "react";
import Button from "@/components/ui/button";
import { En, Fa } from "@/components/ui/multilang";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Space from "@/components/ui/Space";
import { Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { DFeedbackInsert } from "@/types";

export default function ReviewsSection({ reviewQ, prevCourseQ }) {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { profileId } = router.query;
  const userMeQ = useGetUserMe();
  const [isReviewBoxOpened, setIsReviewBoxOpened] = useState(false);
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

  const onSubmit = async (formValues: DFeedbackInsert) => {
    const feedback = {
      ...formValues,
      courseId: prevCourseQ.data[0].id,
      payerId: userMeQ.data?.payer.id,
      updated_at: new Date(Date.now()),
      updated_by: userMeQ.data?.id,
    };

    const { data, error } = await supabase.from("feedback").insert(feedback).select().single();
    if (error) throw new Error("Could not insert the feedback. Please try again. | error details: " + error.message);
    toast.success("You are Logged in.");
    queryClient.invalidateQueries({ queryKey: ["reviewNewWebsite", profileId] });
  };

  const form = useFormHook({
    schema,
    onSubmit,
    defaultValues: {
      studentRating: "0",
      studentFeedback: "",
    },
  });
  return (
    <section>
      <Space size="h-8" />
      <div className="flex gap-2 justify-between max-w-50rem mx-auto">
        <h2 className="H3 !fw-700 c-sand11">
          <En>Reviews</En>
          <Fa>ارزیابی‌ها</Fa>
        </h2>
        {prevCourseQ.data && prevCourseQ.data.length > 0 && (
          <Button variation="ghost" className="bf-i-ph-pencil">
            <span className="c-sand11 text-sm" onClick={() => setIsReviewBoxOpened((prev) => !prev)}>
              Write a Review
            </span>
          </Button>
        )}
      </div>
      <div className="h-6"></div>
      {isReviewBoxOpened && (
        <div>
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
      )}
      <div className="space-y-2">
        <ScrollArea.Root className=" max-w-50rem mx-auto flex ">
          <ScrollArea.Viewport className="w-full max-h-90 rd-2 ">
            <ul className=" flex flex-col gap-3 pie-6 ">
              {reviewQ.data &&
                reviewQ.data.length > 1 &&
                reviewQ.data.map((review) => {
                  return (
                    <li key={review.id}>
                      <Review
                        stars={review.studentRating}
                        reviewText={review.studentFeedback}
                        reviewerName={review?.payer?.user ? review.payer.user.firstname : "Darsoon User"}
                      />
                    </li>
                  );
                })}
            </ul>
          </ScrollArea.Viewport>
          <Space size="h-8" />
          <ScrollArea.Scrollbar
            className={`
          flex select-none touch-none 
          p-0.5 rd-full  bg-sand4 transition-colors duration-500ms ease-out 
          hover:bg-blackA5 
          data-[orientation=vertical]:w-3
          data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-3
          `}
            orientation="vertical"
          >
            <ScrollArea.Thumb
              className={`
          flex-1 bg-sand9 rd-full relative 
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-11 before:min-h-11`}
            />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </section>
  );
}

function Review({ stars, reviewText, reviewerName }) {
  return (
    <div className="p-4 rd-3 bg-sand2A ">
      <div className="flex items-center gap-2 ">
        <span className='fw-300 c-sand11'>{reviewerName}</span>
        <div className="fs-2xs">
          <StarRating number={stars} />
        </div>
      </div>
      <div className="h-1"></div>
      <div className="text-sm"  >{reviewText}</div>
    </div>
  );
}
