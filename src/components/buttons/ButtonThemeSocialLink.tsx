"use client"

import { ListItemProps } from "@/types/list.types";
import { IconWithBg } from "@/components";
import { selectIconForLinks } from "@/lib/socialIcons";
import copyToClipboard from "@/lib/copyToClipboard";

interface SocialLinkButtonProps extends ListItemProps {
  handleName?: string;
}

const SocialLinkButton = ({
  text,
  href,
  handleName,
  onEndIconClick,
}: SocialLinkButtonProps) => {
  const icon = selectIconForLinks(href || "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between bg-white text-cfDark px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-b-4 border-r-4 border-black"
    >
      <div className="flex items-center mr-auto">
        {icon && <IconWithBg className="mr-2 text-cfDark">{icon}</IconWithBg>}
        <span className="font-bold">{text}</span>
      </div>
      {handleName && <span className="text-[12px]">{handleName}</span>}
    </a>
  );
};

interface SocialLinksProps {
    socialLinks: (string | ListItemProps)[];
  }
  
  const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
    const linked: (string | SocialLinkButtonProps)[] = socialLinks.map((item) => {
      if (typeof item === "string") {
        if (item.includes("linkedin")) {
          const handleName = item.split("/").pop();
          return {
            text: "LinkedIn",
            href: item,
            handleName,
          };
        } else if (item.includes("mailto")) {
          const handleName = item.split(":")[1];
          return {
            text: "Email",
            href: item,
            handleName,
          };
        }  else if (item.includes("devclans")) {
            const handleName = item.split("/").pop();
            return {
              text: "Devclans | The Dev Profile",
              href: item,
              handleName,
            };
          } else if (item.includes("discord")) {
            const handleName = item.split("/").pop();
            return {
              text: "Discord",
              href: item,
              handleName,
            };
        } else if (item.includes("twitter")) {
          const handleName = item.split("/").pop();
          return {
            text: "Twitter",
            href: item,
            handleName,
          };
        }
      }
      return item;
    });
  
    return (
      <div className="flex flex-col gap-4">
        {linked.map((link, index) => (
          <SocialLinkButton
            key={index}
            {...(typeof link === "object" ? link : { href: link, text: link })}
          />
        ))}
      </div>
    );
  };
  
  export default SocialLinks;