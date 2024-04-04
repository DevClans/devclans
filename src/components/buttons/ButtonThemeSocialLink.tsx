"use client";

import { ListItemProps } from "@/types/list.types";
import { IconWithBg } from "@/components";
import { selectIconForLinks } from "@/lib/socialIcons";
import copyToClipboard from "@/lib/copyToClipboard";
import ButtonLinkIcon from "./ButtonLinkIcon";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

interface SocialLinkButtonProps extends ListItemProps {
  // handleName?: string;
}

const SocialLinkButton = ({
  text,
  href,
  handleName,
  startIcon,
  onEndIconClick,
}: SocialLinkButtonProps) => {
  const icon = selectIconForLinks(href || "");
  if (!href) {
    return null;
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ngCard flex items-center justify-between bg-white text-nbDark p-4"
    >
      <div className="flex items-center mr-auto text-nbDark">
        {startIcon && startIcon}
        <span className="font-bold ml-2">{text}</span>
      </div>
      {/* {handleName && <span className="text-[12px]">{handleName}</span>} */}
      <div className="arrowIcons relative min-w-10 min-h-4 flex flex-row  overflow-hidden text-nbDark">
        <ChevronRight
          // style={{
          //   color: "red",
          // }}
          size={20}
          className="absolute"
          strokeWidth={2.5}
        />
        <ChevronRight
          size={20}
          strokeWidth={2.5}
          className="transition-all absolute left-4 duration-300 text-nbDark"
        />
      </div>
    </Link>
  );
};

interface SocialLinksProps {
  socialLinks: (string | ListItemProps)[];
}

const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  const linked: ListItemProps[] = socialLinks.map(
    (link: string | ListItemProps) => {
      let data: Partial<ListItemProps> = {
        onEndIconClick: copyToClipboard,
      };
      if (typeof link == "string") {
        data["text"] = link?.split(".com/")?.[1];
        data["href"] = link;
        data["startIcon"] = selectIconForLinks(link, 20, false, {
          className: "stroke-2",
        });
        data["endIcon"] = <ButtonLinkIcon text={link} />;
      } else {
        data = {
          startIcon: selectIconForLinks(link.href!, 20, false, {
            className:
              "stroke-2 " + (link.href?.includes("devclans") ? "invert" : ""),
          }),
          endIcon: <ButtonLinkIcon text={link.text} />,
          ...link,
          onEndIconClick: copyToClipboard,
        };
      }
      return data as ListItemProps;
    }
  );

  return (
    <div className="flex flex-col gap-4">
      {linked.map((link, index) => (
        <SocialLinkButton key={index} {...link} />
      ))}
    </div>
  );
};

export default SocialLinks;
