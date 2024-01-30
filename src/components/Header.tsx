import { PageProps } from "@/types/page.types";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLogin from "./buttons/ButtonLogin";
import ButtonMenuToggle from "./buttons/ButtonMenuToggle";

const Header = ({ searchParams }: PageProps) => {
  return (
    <div
      id="header"
      data-ishome="false"
      className="frcsb data-[ishome=false]:backdrop-blur-[8px] container w-full py-3 relative z-30 "
      style={{}}
    >
      <Logo />
      <Navigation className="hidden lg:flex" searchParams={searchParams} />
      <div className="frc gap-2 ">
        <ButtonLogin />
        <ButtonMenuToggle className="visible lg:hidden" />
      </div>
      <OpenMenu />
    </div>
  );
};

export default Header;

const OpenMenu = () => {
  return (
    <div
      id="openMenu"
      className="w-full lg:!hidden bg-cardBg1 rounded-none h-screen absolute left-0 top-[70px] z-[999]"
    >
      <Navigation
        replaceStyle={{}}
        replaceClassname="fcfs w100 p-6 border-t-border border-t"
      />
    </div>
  );
};
