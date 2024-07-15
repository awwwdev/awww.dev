import Link from "next/link";
import { z } from "zod";
import { useEffect, useState } from "react";
import {  Form, useFormHook, ErrMsg } from "@/components/FormComps";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useGetUserMe from "@/hooks/useGetUserMe";
import Snack from './ui/Snack';

const schema = z.object({
  students: z.array(
    z.object({
      firstname: z.string().min(1, "Please enter student's first name"),
      lastname: z.string().min(1, "Please enter student's lastname"),
      firstnameFa: z.string().min(1, "Please enter student's Farsi firstname"),
      lastnameFa: z.string().min(1, "Please enter student's Farsi lastname"),
      email: z.string().min(1, "Please enter student's Email").email({
        message: "Please enter a valid email for student",
      }),
    })
  ),
});

export default function RegisterNewStudents() {
  const userMeQ = useGetUserMe();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const [students, setStudents] = useState([
    { firstname: "", lastname: "", firstnameFa: "", lastnameFa: "", email: "" },
  ]);

  const [checked, setChecked] = useState(false);
  const addStudent = () => {
    setStudents([...students, { firstname: "", lastname: "", firstnameFa: "", lastnameFa: "", email: "" }]);
  };

  const removeStudent = (index) => {
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents.splice(index, 1);
      return updatedStudents;
    });
    const currentStudents = form.getValues("students");
    form.setValue(
      "students",
      currentStudents.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (formValues) => {
    for (const std of formValues.students) {
      if (std.email === userMeQ.data.email) {
        const { data: userAsStudentData, error: userAsStudentError } = await supabase.from("student").insert({
          id: userMeQ.data.payer.id,
          payerId: userMeQ.data.payer.id,
          dateJoined: new Date().toISOString(),
        });

        if (userAsStudentError) {
          throw userAsStudentError;
        }
      } else {
        const correctStudentFormValues = {
          ...std,
          name_dep: std.firstname + " " + std.lastname,
          nameFa_dep: std.firstnameFa + " " + std.lastnameFa,
        };
        const body = JSON.stringify(correctStudentFormValues);

        const res = await fetch("/api/create-student-user", {
          method: "POST",
          body,
        });

        const { data: studentData, error } = await res.json();
        if (error?.message === "JSON.parse: unexpected character at line 1 column 1 of the JSON data") {
          throw new Error("Something went wrong in the server. Please contact the developers");
        }
        if (error) {
          throw error;
        }

        const { data: insertStudentData, error: insertStudentError } = await supabase
          .from("user")
          .update({
            ...std,
          })
          .eq("id", studentData[0].id);

        if (insertStudentError) {
          throw insertStudentError;
        }

        const { data: studentFinalData, error: studentFinalError } = await supabase.from("student").insert({
          id: studentData[0].id,
          payerId: userMeQ.data.payer.id,
          dateJoined: new Date().toISOString(),
        });

        if (studentFinalError) {
          throw studentFinalError;
        }
      }
    }
    queryClient.invalidateQueries({ queryKey: ["studentChecker"] });
  };

  const form = useFormHook({ schema: schema, onSubmit });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  return (
    <div className="space-y-2 b-1  b-solid rd-lg p-4 w-80 bg-gray1">
      <div className="space-y-4">
        <Form form={form} onSubmit={onSubmit} className="space-y-2" submitText="Add">
          <Snack variant='info' >
            <p>Add student information</p>
</Snack>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked((prev) => !prev);
              if (e.target.checked) {
                setStudents((students) => [
                  {
                    firstname: userMeQ.data.firstname,
                    lastname: userMeQ.data.lastname,
                    firstnameFa: userMeQ.data.firstnameFa,
                    lastnameFa: userMeQ.data.lastnameFa,
                    email: userMeQ.data.email,
                  },
                  ...students,
                ]);
              } else {
                removeStudent(0);
              }
            }}
          />
          {students.map((student, index) => (
            <div key={index}>
              <p>Enter student {index + 1} info</p>
             <Form.Input
                name={`students[${index}].firstname`}
                defaultValue={student.email === userMeQ.data.email ? userMeQ.data.firstname : ""}
                readOnly={student.email === userMeQ.data.email}
                required
              />
             <Form.Input
                name={`students[${index}].lastname`}
                defaultValue={student.email === userMeQ.data.email ? userMeQ.data.lastname : ""}
                readOnly={student.email === userMeQ.data.email}
                required
              />
             <Form.Input
                name={`students[${index}].firstnameFa`}
                defaultValue={student.email === userMeQ.data.email ? userMeQ.data.firstnameFa : ""}
                readOnly={student.email === userMeQ.data.email}
                required
              />
             <Form.Input
                name={`students[${index}].lastnameFa`}
                defaultValue={student.email === userMeQ.data.email ? userMeQ.data.lastnameFa : ""}
                readOnly={student.email === userMeQ.data.email}
                required
              />
             <Form.Input
                name={`students[${index}].email`}
                defaultValue={student.email === userMeQ.data.email ? userMeQ.data.email : ""}
                readOnly={student.email === userMeQ.data.email}
                required
              />
              <button type="button" onClick={() => removeStudent(index)}>
                Remove Student
              </button>
            </div>
          ))}
          <button type="button" onClick={addStudent}>
            Add Student
          </button>
        </Form>
      </div>
    </div>
  );
}
