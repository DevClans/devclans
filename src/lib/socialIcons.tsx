import { IconGithub, IconTwitter } from "@/components";
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Figma,
  Globe,
  Mail,
} from "lucide-react";

export const socialIcons: Record<string, React.ReactNode> = {
  discord: "Discord",
  email: <Mail />,
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  linkedin: <Linkedin />,
  facebook: <Facebook />,
  instagram: <Instagram />,
  youtube: <Youtube />,
  figma: <Figma />,
  github: <IconGithub />,
  twitter: <IconTwitter />,
  website: <Globe />,
};

export const selectIconForLinks = (link: string) => {
  let type = "website";
  if (link.includes("github")) type = "github";
  else if (link.includes("discord")) type = "discord";
  else if (link.includes("twitter") || link.includes("x.com")) type = "twitter";
  else if (link.includes("linkedin")) type = "linkedin";
  else if (link.includes("facebook")) type = "facebook";
  else if (link.includes("instagram")) type = "instagram";
  else if (link.includes("youtube")) type = "youtube";
  else if (link.includes("figma")) type = "figma";
  return socialIcons[type];
};
