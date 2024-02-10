import Image from "next/image";

const loading = () => {
  return (
    <div className="w-screen h-screen fccc gap-2">
      <Image
        src={"/W.gif"}
        priority={true}
        alt="loading icon"
        height={40}
        width={40}
      />
      <h3 className="text-primary">Loading...</h3>
    </div>
  );
};

export default loading;
