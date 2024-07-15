import Input from "@/components/ui/Input";
import Space from "@/components/ui/Space";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const userName = formData.get("name");
      const userId = formData.get("id");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phoneNumber,
            subject,
            message,
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

  const [isPhoneShown, setIsPhoneShown] = useState<boolean>(false);
  const [isEmailShown, setIsEmailShown] = useState<boolean>(false);
  return (
    <div className="mx-auto max-w-50rem ">
      <h1 className="H1">Contact Us</h1>
      <Space size="h-8" />
      <p>
        <span className="text-accent10 font-bold ">Phone (WhatsApp):</span>
        <div className=" flex items-center h-3em">
          {isPhoneShown && (
            <a href="tel:+18773703277" className="">
              +1 (877) 370 3277
            </a>
          )}
          {!isPhoneShown && (
            <Button className="fs-xs" variation="ghost" onClick={() => setIsPhoneShown(true)}>
              Click to show the Phone
            </Button>
          )}
        </div>
      </p>
      <Space size="h-4" />

      <p className="">
        <span className="text-accent10 font-bold ">Email:</span>
        <div className=" flex items-center h-3em">
          {isEmailShown && (
            <a href="mailto:info@darsoon.com" className="">
              info@darsoon.com
            </a>
          )}
          {!isEmailShown && (
            <Button className="fs-xs" variation="ghost" onClick={() => setIsEmailShown(true)}>
              Click to show the Email{" "}
            </Button>
          )}
        </div>
      </p>

      <p className="text-accent10 font-bold mt-4">Mailing Address:</p>
      <p className="">Darsoon Inc., 47 Brunel Street, Maple, Ontario, L6A 0R3, Canada</p>
      <div className="h-12"></div>
      <h2 className="H2">Message Us</h2>
      <p className="mt-4">We will be happy to share your thoughts with us by filling out the form below.</p>
      <form onSubmit={handleSubmit} ref={formRef} className="mt-4">
        <div className="flex gap-2 flex-wrap">
          <Input name="firstname" label="First Name" type="text" value={firstname} setValue={setFirstname} required />
          <Input name="lastname" label="Last Name" type="text" value={lastname} setValue={setLastname} required />
        </div>
        <Input name="email" label="Email" type="email" value={email} setValue={setEmail} required />
        <Input
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={phoneNumber}
          setValue={setPhoneNumber}
          required
        />
        <Input name="subject" label="Subject" type="text" value={subject} setValue={setSubject} required />
        <TextArea
          name="message"
          label="Description"
          rows={10}
          required
          value={message}
          setValue={setMessage}
        />
        <Button type="submit" variation="solid-accent">
          Send
        </Button>


        <div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
