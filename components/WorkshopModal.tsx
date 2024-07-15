import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useGetUserMe from "@/hooks/useGetUserMe";
import { renderNoData } from "./RenderQ";
import { getFullName } from "@/utils/formatter";
import { z } from "zod";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const schema = z.object({
  topicId: z.string().min(1, "Please enter topic ID here"),
  teacherId: z.string().min(1, "Please enter teacher ID here"),
  payerId: z.string().min(1, "Please enter payer ID"),
  studentId: z.array(z.string()).nonempty({ message: "Can't be empty" }),
});

const WorkshopModal = ({ courseId, price }) => {
  console.log("price is:", price);
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const courseQ = useQuery({
    queryKey: ["workshopModalRequest-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course")
        .select(`*, teacher(user(firstname, lastname))`)
        .eq("id", courseId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const studentQ = useQuery({
    queryKey: ["introductoryMeetingRequestStudents-1"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student")
        .select(`id, payerId, user(firstname, lastname)`)
        .eq("payerId", userMeQ.data?.payer.id);
      if (error) throw error;
      return data;
    },
    enabled: !!userMeQ.data?.payer.id,
  });

  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleStudentChange = (event) => {
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, event.target.value]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== event.target.value));
    }
  };

  const [addedRecord, setAddedRecord] = useState(null);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      const now = new Date();
      const dateTimeString = now.toISOString().substring(0, 16);
      const paymentByPayer = {
        date: dateTimeString,
        payerId: userMeQ.data?.payer.id,
        amountBeforeDiscountsInCAD: price,
        method: "Website",
        amountActuallyPaidInCAD: price,
      };
      const { data, error } = await supabase.from("paymentByPayer").insert(paymentByPayer).select();
      if (error) {
        throw new Error(error.message);
      }

      console.log(selectedStudents);

      const courseStudentPromises = selectedStudents.map((studentId) => {
        const courseStudent = {
          courseId: courseId,
          studentId: studentId,
          payerId: userMeQ.data?.payer.id,
        };

        return supabase.from("courseStudent").insert(courseStudent);
      });

      const courseStudentResults = await Promise.all(courseStudentPromises);

      courseStudentResults.forEach(({ data, error }, index) => {
        if (error) {
          console.error(`Error inserting student ${selectedStudents[index]}: `, error);
        } else {
          console.log(`Successfully inserted student ${selectedStudents[index]}: `, data);
        }
      });

      console.log(details);
    });
  };

  const now = new Date();
  const dateTimeString = now.toISOString().substring(0, 16);

  return (
    <>
      <h2 className="H2">Booking and Payment</h2>
      {renderNoData(courseQ) ?? renderNoData(userMeQ) ?? renderNoData(studentQ) ?? (
        <>
          {/*           <p>
            Tutor: {getFullName(courseQ.data.teacher.user)}, Subject: {courseQ.data.topic.name}
          </p> */}
          {!addedRecord && (
            <>
              <fieldset>
                <legend className="c-sand11 fw-500 capitalize">
                  Student(s)<sup className="c-red11"> *</sup>
                </legend>
                {studentQ.data.map((student) => {
                  return (
                    <label key={student.id}>
                      <input
                        type="checkbox"
                        name="studentId"
                        value={student.id}
                        className="inline"
                        onChange={handleStudentChange}
                      />
                      {getFullName(student.user)}
                    </label>
                  );
                })}
              </fieldset>
              <p>Total Cost: ${price}</p>
              <PayPalScriptProvider
                options={{
                  "client-id": "AYeyepXZWmbVDtnZ_X-x7L-4iPUIzjbZvemtRoormIVdiNDJCn_WJ_zpLIlPAfn3O7OFa3HetJa-zvb_",
                }}
              >
                <div className="w-full">
                  <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </div>
              </PayPalScriptProvider>
            </>
          )}

          {addedRecord && (
            <div className="snack-success">
              <p className="H2">You successfully enrolled in this workshop.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WorkshopModal;
