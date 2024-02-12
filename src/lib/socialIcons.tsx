import { IconGithub, IconTwitter } from "@/components";
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Figma,
  Globe,
  Mail,
  Github,
  Twitter,
} from "lucide-react";

export const socialIcons: any = (props: any) => {
  return {
    discord: "Discord",
    email: <Mail {...props} />,
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    linkedin: <Linkedin {...props} />,
    facebook: <Facebook {...props} />,
    instagram: <Instagram {...props} />,
    youtube: <Youtube {...props} />,
    figma: <Figma {...props} />,
    github: <Github {...props} />,
    twitter: <Twitter {...props} />,
    website: <Globe {...props} />,
  };
};

export const selectIconForLinks = (link: string) => {
  if (!link) {
    return socialIcons({ size: 16 }).website;
  }
  let type = "website";
  if (link.includes("github")) type = "github";
  else if (link.includes("discord")) type = "discord";
  else if (link.includes("twitter") || link.includes("x.com")) type = "twitter";
  else if (link.includes("linkedin")) type = "linkedin";
  else if (link.includes("facebook")) type = "facebook";
  else if (link.includes("instagram")) type = "instagram";
  else if (link.includes("youtube")) type = "youtube";
  else if (link.includes("figma")) type = "figma";
  return socialIcons({ size: 16 })[type];
};
