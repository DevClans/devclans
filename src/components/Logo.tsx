import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link title="Devclans Logo" href={"/"} className="relative" id="logo">
        <Image src={"/logo.png"} alt="devclans logo" width={76} height={30} />
        <p
          style={{
            fontFamily: "var(--poppins)",
          }}
          className="uppercase font-semibold absolute text-[10px] inline-flex -bottom-[8px] right-0"
        >
          beta
        </p>
      </Link>
    </>
  );
};

export default Logo;
