import Image from "next/image";
import Link from "next/link";

const Logo = ({
  size = "small",
  isBeta = true,
}: {
  size?: "small" | "large";
  isBeta?: boolean;
}) => {
  const isLarge = size === "large";
  return (
    <>
      <Link title="Devclans Logo" href={"/"} className="relative" id="logo">
        <Image
          src={"/logo.png"}
          priority={true}
          alt="devclans logo"
          width={76 * (isLarge ? 2 : 1)}
          height={30 * (isLarge ? 2 : 1)}
        />
        {isBeta && (
          <p
            style={{
              fontFamily: "var(--poppins)",
            }}
            className="uppercase font-semibold absolute text-[10px] inline-flex -bottom-[8px] right-0"
          >
            beta
          </p>
        )}
      </Link>
    </>
  );
};

export default Logo;
