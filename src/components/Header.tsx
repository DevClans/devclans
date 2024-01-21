import { PageProps } from "@/types/page.types";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLogin from "./buttons/ButtonLogin";

const Header = ({ searchParams }: PageProps) => {
  return (
    <div
      className="frcsb container w-full py-3 relative z-30 "
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      <Logo />
      <Navigation searchParams={searchParams} />
      <ButtonLogin />
    </div>
  );
};

export default Header;
