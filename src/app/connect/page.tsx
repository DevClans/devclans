"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import { ButtonBlue } from "@/components";
import CommonHero from "@/components/CommonHero";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <>
      <CommonHero
        heading="Connect With"
        highlightHeading="Devclans"
        isLeft={true}
        desc="Want to give an suggestion? report a bug? or even talk to us regarding anything? Fill out the form and we will reply within 48hrs."
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container w-full gap-3 p-6 fcc max-w-md mx-auto"
      >
        <div className=" w100">
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-medium text-text"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border    p-3 text-sm font-medium  outline-none focus:border-priDark focus:shadow-md"
            {...register("name", { required: true })}
          />
        </div>
        <div className=" w100">
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-medium text-text"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="w-full border    p-3 text-sm font-medium  outline-none focus:border-priDark focus:shadow-md"
            {...register("email", { required: true })}
          />
        </div>
        <div className="w100">
          <label
            htmlFor="message"
            className="mb-1 block text-xs font-medium text-text"
          >
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your message"
            className="w-full resize-none border  p-3 text-sm font-medium  outline-none focus:border-priDark focus:shadow-md"
            {...register("message", { required: true })}
          ></textarea>
        </div>
        <ButtonBlue label="Submit" className="w100" />
      </form>
    </>
  );
};

export default Contact;
