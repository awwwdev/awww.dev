import { renderNoData } from "@/components/RenderQ";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/button";
import useGetUserMe from "@/hooks/useGetUserMe";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const userQ = useQuery({
    queryKey: ["userAccount-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user").select(`*`).eq("id", userMeQ.data?.id).single();
      if (error) throw error;
      return data;
    },
    enabled: userMeQ.isSuccess,
  });
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const userName = formData.get("name");
      const userId = formData.get("id");

      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            id: userId,
            subject,
            description,
          }),
        });

        if (response.ok) {
          toast.success("Email sent successfully!");
        } else {
          toast.error("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("There was an error sending the email", error);
        toast.error("Failed to send email. Please try again.");
      }
    }
  };

  return (
    <div className='mx-auto max-w-50rem'>
      <h1 className="H1">Report a Bug</h1>
      <p className="mt-4">
        Spot a bug  🐞 ? We&apos;d love to know! Use this form to help us improve our website. Together, we&apos;ll make it even
        better!
      </p>
      {renderNoData(userQ) ?? (
        <form onSubmit={handleSubmit} ref={formRef} className="mt-4">
          <div className="sr-only">
            <label>Name</label>
            <input type="hidden" name="name" value={userQ.data?.firstname + " " + userQ.data?.lastname} />
          </div>
          <div className="sr-only">
            <label>ID</label>
            <input type="hidden" name="id" className="field w-full" value={userQ.data?.id} />
          </div>
          <Input
            name="subject"
            label="Subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextArea
            name="description"
            label="Description"
            rows={10}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextArea>
          <Button variation="solid-prm" type="submit" width="parent">
            Send
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
