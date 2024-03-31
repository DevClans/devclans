import { PropsWithChildren } from "react";

const HeroWhitePattern = ({
  children,
  className,
}: PropsWithChildren & {
  className?: string;
}) => {
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        background:
          "var(--diagonal-lines, url('/patterns/diagonalLine.png') lightgray 0% 0% / 100px 100px repeat)",
      }}
    >
      {children}
    </div>
  );
};

export default HeroWhitePattern;
