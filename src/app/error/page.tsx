import { PageProps } from "@/types/page.types";
import Link from "next/link";

const page = ({ searchParams }: PageProps) => {
  const error = searchParams?.error?.toString().toLowerCase();
  const generateErrorEle = () => {
    switch (error) {
      case "ratelimit":
        return (
          <>
            <p className="text-highlight">{`Sorry, you've attempted to log in too many times. Please try again later after few mins.`}</p>
            <br />
            <p className="text-xs">
              <b>If the problem persists</b>
              {`, please don't hesitate to contact us for further
assistance.`}
              You can reach our support team at{" "}
              <Link
                href="mailto:contact.devclans@email.com"
                className="text-primary underline"
              >
                contact.devclans@email.com
              </Link>{" "}
              or send an email using{" "}
              <Link className="text-primary underline" href="/connect">
                contact form.
              </Link>
              <br />
              <br />
              {`We're here to help resolve any issues you may be experiencing with
logging in. Thank you for your understanding.`}
            </p>
          </>
        );
      case "notmember":
        return (
          <>
            <p className="text-highlight">
              This website is currently exclusively available to members of the
              100xdevs cohort. Register for the next beta{" "}
              <Link className="text-primary underline" href="/connect">
                here
              </Link>{" "}
              and let us know why you want to join. Thank you for your interest!
            </p>
            <br />
            <p className="text-xs">
              <b>If you are a member</b>{" "}
              {`and seeing this message, please don't hesitate to `}reach our
              support team at{" "}
              <Link
                href="mailto:contact.devclans@email.com"
                className="text-primary underline"
              >
                contact.devclans@email.com
              </Link>{" "}
              or send an email using{" "}
              <Link className="text-primary underline" href="/connect">
                contact form
              </Link>
              .
            </p>
          </>
        );
      default:
        return (
          <>
            <p className="text-highlight">{`Sorry, you've encountered an error while logging in. Please try again.`}</p>
            <br />
            <p className="text-xs">
              <b>If the problem persists</b>
              {`, please don't hesitate to contact us for further
assistance.`}
              You can reach our support team at{" "}
              <Link
                href="mailto:contact.devclans@email.com"
                className="text-primary underline"
              >
                contact.devclans@email.com
              </Link>{" "}
              or send an email using{" "}
              <Link className="text-primary underline" href="/connect">
                contact form.
              </Link>
              <br />
              <br />
              {`We're here to help resolve any issues you may be experiencing with
logging in. Thank you for your understanding.`}
            </p>
          </>
        );
    }
  };
  const ele = generateErrorEle();
  return (
    <div className="w-screen h-screen container !max-w-[600px] fccc gap-4">
      <div className="frc gap-4">
        <h2 className="text-text">Error </h2>
        <h2 className="font-medium">|</h2>
        <h2>{searchParams?.error}</h2>
      </div>
      <div className="fcfs ">{ele}</div>
    </div>
  );
};

export default page;
