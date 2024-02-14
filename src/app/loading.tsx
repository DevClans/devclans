import Image from "next/image";

const loading = () => {
  return (
    <div className="w-screen h-screen fccc bg-bg fixed top-0 right-0 z-50 gap-2">
      <Image
        src={"/W.gif"}
        priority={true}
        alt="loading icon"
        height={40}
        width={40}
      />
      <h3 className="text-priDark">Loading...</h3>
    </div>
  );
};

export default loading;
