import { Logo } from "@/components";
import Link from "next/link";

const error = () => {
  return (
    <div className="fcc mt-7 gap-2">
      <h2>The page you’re looking for doesn’t exist.</h2>
      <p>
        Want this to be your username?{" "}
        <Link className="text-primary underline" href="/api/auth/signin">
          Connect to Devclans now
        </Link>
      </p>
    </div>
  );
};

export default error;
