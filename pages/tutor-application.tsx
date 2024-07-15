import { z } from "zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import {  Form, ErrMsg, useFormHook } from "@/components/FormComps";
import { useState } from "react";
import { Database } from "@/supabase/db_types";
import Select from "@/components/Select";
import { DTutorApplicationInsert } from "@/types";

const queryKey = "tutorApplication-1";
const tableName = "tutorApplication";

export const schema = z.object({
  fullName: z.string().min(5, "Please enter your name here."),
  subject: z.string().min(1, "Please enter topic's name"),
  email: z.string().min(1, "Please enter topic name in Farsi"),
  phone: z.string().min(1, "Please enter topic's idInSheet"),
  howLearnedAboutUs: z.string().min(1, "Please enter topic's idInSheet"),
  englishLevel: z.string().optional().nullable(),
  socialMedia: z.string().optional().nullable(),
  teachingExperience: z.string().min(1, "Please enter topic's idInSheet"),
  onlineTeachingExperience: z.string().optional().nullable(),
  foreignTeachingExperience: z.string().optional().nullable(),
  degreeOfEducation: z.string().optional().nullable(),
  duration: z.string().min(1, "Please enter topic's idInSheet"),
  price: z.string().min(1, "Please enter topic's idInSheet"),
  ageGroup: z.array(z.enum(["4-6", "6-12", "12-18", "18-65", "65-up"])).nonempty({ message: "Can't be empty" }),
  honors: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});

export default function Page() {
  const supabase = useSupabaseClient<Database>();
  const queryClient = useQueryClient();
  const [addedRecord, setAddedRecord] = useState<DTutorApplicationInsert | null>(null);
  const onSubmit = async (formValues: DTutorApplicationInsert) => {
    const correctFormValues = {
      ...formValues,
    };
    const { data, error } = await supabase.from(tableName).insert(correctFormValues).select().single();
    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    setAddedRecord(data);
  };
  const form = useFormHook({ schema, onSubmit });

  return (
    <div lang='fa' dir="rtl" className="mx-auto max-w-50rem">
      <h1 className="H1 mb-4">فرم ثبت‌نام معلم</h1>
      <p className="mb-4">
        اگر مایلید یکی از معلم‌های درسون باشید، فرم زیر را پر کنید و برای ما بفرستید.
        <br />
         ما بررسی می‌کنیم و در صورت نیاز به
        رشته‌ی شما با شما تماس می‌گیریم.
      </p>
      <Form form={form} className="space-y-2" submitText="ارسال">
        <div className="sm:grid grid-cols-2 gap-3">
          <Form.Input name="fullName" label="نام و نام خانوادگی" required />
          <Form.Input name="subject" label="کلاس یا کلاسهایی که مایل به درس دادن هستید" required />
        </div>
        <div className="sm:grid grid-cols-2 gap-3">
          <Form.Input name="email" label="آدرس ایمیل" required />
          <Form.Input name="phone" label="شماره موبایلی که به واتساپ وصل باشد" required />
        </div>
        <Form.Input name="howLearnedAboutUs" label="روش آشناییتان با ما (نام معرف، ...)" required />

        <label className="flex flex-col gap-1">
          <span className="c-sand11 fw-500 block capitalize">
            میزان آشنایی با زبان انگلیسی<sup className="c-red11"> *</sup>
          </span>
        </label>
        <Select
          placeholder="لطفا یه گزینه را انتخاب کنید."
          name="englishLevel"
          {...form.register("englishLevel")}
          options={[
            ["کم", "کم (فقط توانایی تدریس به فارسی‌زبان)"],
            ["متوسط", "متوسط (توانایی فهمیدن انگلیسی و استفاده از لغات انگلیسی در میان مکالمه فارسی)"],
            ["عالی", "عالی (توانایی کامل فهمیدن و صحبت کردن انگلیسی، توانایی تدریس به زبان انگلیسی به غیرفارسی‌زبان)"],
          ]}
          required
          errorMessage={form.formState.errors['englishLevel']?.message?.toString() ?? ""}
        />
        <Form.Input name="socialMedia" label="وبسایت شخصی یا صفحه‌ی لینکدین/اینستاگرام" />
        <Form.TextArea
          label="تجربه‌ی تدریس حضوری "
          hint="مثلا پنج سال تدریس تنبک در آموزشگاه خوارزمی ..."
          required
          {...form.register("teachingExperience")}
          rows={5}
          placeholder=""
        />
        {/* <label className="mt-8">
          <span className="mb-2 c-sand11 fw-500 block capitalize">
            <sup className="c-red11"> *</sup>
          </span>
          <textarea
            rows={5}
            aria-invalid={form?.formState?.errors?.teachingExperience ? "true" : "false"}
            className="field mb-2 p-4 block min-w-40 w-full rd-xl resize-both"
            required
          ></textarea>
          <ErrMsg name="teachingExperience" />
        </label> */}
        <Form.TextArea
          label="  تجربه‌ی‌ تدریس آنلاین "
          hint=" مثلا دو سال تدریس آنلاین فرانسه به حدود بیست شاگرد..."
          required
          {...form.register("onlineTeachingExperience")}
          rows={5}
          placeholder=""
        />
        <Form.TextArea
          label="تجربه‌ی تدریس به ایرانیان خارج از کشور "
          hint="مثلا شش ماه تدریس آنلاین گیتار به سه بچه‌ی دوزبانه در کانادا"
          required
          {...form.register("foreignTeachingExperience")}
          rows={5}
          placeholder=""
        />

        <Form.Input name="degreeOfEducation" label="مدرک تحصیلی و دانشگاه" />
        <Form.Input name="duration" type="number" label="مدت زمان هر جلسه (به دقیقه)" required />
        <Form.Input name="price" type="number" label="هزینه‌ی هر جلسه (به دلار کانادا)" required />

        <fieldset>
          <legend className="c-sand11 fw-500 capitalize">
            گروه سنی شاگرد (می‌توانید هر چند گزینه را انتخاب کنید)<sup className="c-red11"> *</sup>
          </legend>
          <label>
            <input {...form.register("ageGroup")} type="checkbox" name="ageGroup" value="4-6" className="inline" />{" "}
            خردسال (۴ تا ۶ سال)
          </label>
          <label>
            <input {...form.register("ageGroup")} type="checkbox" name="ageGroup" value="6-12" className="inline" />{" "}
            کودک (۶ تا ۱۲ سال)
          </label>
          <label>
            <input {...form.register("ageGroup")} type="checkbox" name="ageGroup" value="12-18" className="inline" />{" "}
            نوجوان (۱۲ تا ۱۸ سال)
          </label>
          <label>
            <input {...form.register("ageGroup")} type="checkbox" name="ageGroup" value="18-65" className="inline" />{" "}
            بزرگسال (۱۸ تا ۶۵ سال)
          </label>
          <label>
            <input {...form.register("ageGroup")} type="checkbox" name="ageGroup" value="65-up" className="inline" />{" "}
            ارشد (۶۵ سال به بالا)
          </label>
        </fieldset>
        <Form.TextArea label="افتخارات" {...form.register("honors")} rows={5} placeholder="" />
        <Form.TextArea
          label="هر مطلب دیگری که فکر می‌کنید خوب است ما درباره‌ی شما بدانیم"
          {...form.register("note")}
          rows={5}
          placeholder=""
        />
      </Form>

      {addedRecord && (
        <div className="snack-success">
          <p className="H2">درخواست شما با موفقیت ثبت شد</p>
        </div>
      )}
    </div>
  );
}
