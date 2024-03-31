import ImageComp from "@/components/ImageComp";
import { selectIconForLinks, socialIcons } from "@/lib/socialIcons";
import { ListItemProps, ListProjectProps } from "@/types/list.types";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const CfSocialLink = ({
  index,
  link,
  isProject = false,
}: {
  isProject?: boolean;
  index: number;
  link: string | ListItemProps | ListProjectProps;
}) => {
  const colors = [
    "--cf-green-light",
    "--cf-blue-light",
    "--cf-pink-light",
    "--cf-purple-light",
    "--cf-orange-light",
  ];
  const isStr = typeof link === "string";
  const href = isStr ? link : link["href"] || "/";
  const icon = selectIconForLinks(href, undefined, false, {
    isDark: true,
    className: " lg:h-[20px] lg:w-[20px] stroke-[2.5px]",
  });
  const haveDesc = isProject && typeof link == "object" && (link as any)?.desc;
  const color = colors[index % colors.length];
  return (
    <Link
      href={href}
      className={` group linkCard  rounded-[10px] w-full gap-2  ${
        isProject
          ? "pb-4 lg:pb-0  flex lg:flex-row lg:justify-between items-center flex-col lg:*:!text-center"
          : "frcsb px-5"
      }`}
      style={{
        backgroundColor: `var(${color})`,
      }}
    >
      {isProject &&
        Array.isArray((link as ListProjectProps)?.imgs) &&
        (link as any).imgs.length > 0 && (
          <div className="relative lg:hidden w-full h-[200px] rounded-t-[10px] overflow-hidden">
            <div
              className="absolute z-10 h-full w-full"
              style={{
                background: `linear-gradient(180deg,transparent 75%,var(${color}) 100%)`,
              }}
            />

            <ImageComp
              src={(link as any).imgs?.[0]}
              alt={(link as any).text + " | Devclans"}
              fill={true}
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      <div
        className={`${
          isProject ? "px-2 lg:px-5" : ""
        } frc py-3 lg:py-6 gap-2 w-full text-cfDark`}
      >
        {!isProject && icon}
        <div
          className={` ${
            isProject
              ? "flex flex-col gap-1 items-center lg:items-start w-full"
              : ""
          }`}
        >
          <div
            className={`  ${
              isProject
                ? "uppercase text-lg font-bold"
                : "font-semibold text-sm lg:text-lg"
            }`}
          >
            {isStr ? selectIconForLinks(link, undefined, true) : link["text"]}
          </div>
          {isProject && (
            <p className="text-[10px] flex gap-2 !text-cfDark font-regu max-w-full text-nowrap text-ellipsis overflow-hidden">
              {(link as ListProjectProps).skills?.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs text-cfDark font-semibold   uppercase"
                >
                  {skill}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <div
        className={`flex flex-col lg:flex-row items-center  gap-5 ${
          haveDesc
            ? "border-t-[2px] lg:border-t-0 lg:border-l-[2px] border-solid border-cfDark lg:w-fit w-[90%] lg:px-5"
            : ""
        } `}
      >
        {haveDesc && (
          <p className="!text-cfDark pt-3 lg:pt-0 italic lg:not-italic font-medium  lg:font-regular">
            {(link as any).desc?.substring(0, 50)}
          </p>
        )}
        <div
          className={`bg-cfDark flex-shrink-0 ${
            isProject ? "h-[50px] w-[50px]" : "h-[25px] w-[25px]"
          } lg:h-[35px] lg:w-[35px] fccc rounded-[5px]`}
        >
          <MoveRight
            color="white"
            className={`${
              isProject ? "h-[24px] w-[24px]" : "h-[12px] w-[12px]"
            }  lg:h-[20px] lg:w-[20px] group-hover:-rotate-45 transition-transform duration-300 ease-in-out`}
          />
        </div>
      </div>
    </Link>
  );
};

export default CfSocialLink;
