import { PageProps } from "@/types/page.types";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLogin from "./buttons/ButtonLogin";

const Header = ({ searchParams }: PageProps) => {
  return (
    <div className="frcsb container w-full py-4 relative z-10">
      <Logo />
      <Navigation searchParams={searchParams} />
      <ButtonLogin />
    </div>
  );
};

export default Header;
