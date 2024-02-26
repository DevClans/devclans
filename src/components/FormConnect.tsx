"use client";
import { useForm } from "react-hook-form";
import { ButtonBlue } from "@/components";
import CommonHero from "@/components/CommonHero";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodContactForm } from "@/zod/zod.common";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import { createProjectUser } from "@/utils/createProjectUser";

export type FormData = z.infer<typeof zodContactForm>;

const FormConnect = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(zodContactForm),
  });

  async function onSubmit(data: FormData) {
    try {
      // console.log(data, "here");
      await createProjectUser(
        "/email",
        data,
        { _id: true },
        setError,
        "Email sent successfully",
        false
      );
      // await sendEmail(data);
    } catch (error) {
      console.log(error, "error in sending email contact form");
    }
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
        id="contactForm"
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
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="error">{message}</p>}
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
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error">{message}</p>}
          />
        </div>
        <div className="w100">
          <label
            htmlFor="message"
            className="mb-1 block text-xs font-medium text-text"
          >
            * Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your message"
            className="w-full resize-none border  p-3 text-sm font-medium  outline-none focus:border-priDark focus:shadow-md"
            {...register("message", { required: true })}
          ></textarea>
          <ErrorMessage
            errors={errors}
            name="message"
            render={({ message }) => <p className="error">{message}</p>}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={"root" as any}
          render={({ message }) => <p className="w100 error">{message}</p>}
        />
        <ButtonBlue
          label="Send Message"
          className="w100"
          // type="submit"
          loading={isSubmitting}
          // form="contactForm"
        />
      </form>
    </>
  );
};

export default FormConnect;
