import Logo from "@/components/Logo";
import IconAll from "@/components/icons/IconAll";
import IconAndroid from "@/components/icons/IconAndroid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-center my-10">
      <h1 className="font-bold text-4xl">DevClans</h1>
      <IconAll color="" size={20} />
      <IconAndroid size={20} />
      <Logo />
    </main>
  );
}
