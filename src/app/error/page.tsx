import { PageProps } from "@/types/page.types";
import Link from "next/link";

const page = ({ searchParams }: PageProps) => {
  const notMember = searchParams?.error === "notMember";
  return (
    <div className="w-screen h-screen container fccc gap-2">
      <h2>Error</h2>
      <h3>{searchParams?.error}</h3>
      {notMember && (
        <>
          <p>
            This website is exculisively limited to 100xdevs cohort members for
            now. Register for next beta{" "}
            <Link className="text-primary underline" href="/connect">
              here.
            </Link>
            . Let us know why you want to join. Thank you!
          </p>
          <p>
            If you are a member and see this message, please contact us at
            discord or{" "}
            <Link className="text-primary underline" href="/connect">
              send an email using contact form.
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default page;
