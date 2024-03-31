import ImageComp from "@/components/ImageComp";
import { ImageProps } from "@/types";

const CfImage = ({
  alt,
  className,
  username,
  displayName,
  ...props
}: ImageProps & { username?: string; displayName?: string }) => {
  return (
    <div className="rounded-[5px] absolute justify-self-center w-fit fcc bg-white p-1 lg:pb-3">
      <ImageComp
        isUser={true}
        alt={alt || "profile of user"}
        {...props}
        className={"rounded-[5px] " + className}
      />
      <div className=" w100 fcc overflow-hidden mt-1  lg:mt-2">
        <h2
          className={`!text-cfDark w-full px-1 font-semibold text-center lg:text-[24px] text-ellipsis overflow-hidden text-lg leading-4 lg:leading-[24px]`}
        >
          {displayName || username}
        </h2>
        {username && (
          <p className="text-cfDark text-[10px] lg:text-sm text-ellipsis font-medium opacity-70 overflow-hidden">
            @{username}
          </p>
        )}
      </div>
    </div>
  );
};

export default CfImage;
