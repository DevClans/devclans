import { PageProps } from "@/types/page.types";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLogin from "./buttons/ButtonLogin";
import ButtonMenuToggle from "./buttons/ButtonMenuToggle";
import { FilePlus2 } from "lucide-react";
import colors from "@/lib/colors";
import Link from "next/link";
import { IconWithBg } from ".";

const Header = ({ searchParams }: PageProps) => {
  return (
    <div
      id="header"
      data-ishome="false"
      className="frcsb data-[ishome=false]:backdrop-blur-[8px] container w-full py-2 relative z-30 "
      style={{}}
    >
      <Logo />
      <Navigation className="hidden lg:flex" searchParams={searchParams} />
      <div className="frc gap-2 ">
        <IconWithBg title={"Create Project"} href="/project/new">
          <FilePlus2 size={20} color={colors.subH} />
        </IconWithBg>
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
      className="w-full fixed lg:!hidden bg-cardBg1 rounded-none h-screen  left-0 top-[61px] z-[999]"
    >
      <Navigation
        replaceStyle={{}}
        replaceClassname="fcfs w100 p-6 border-t-border border-t"
      />
    </div>
  );
};
