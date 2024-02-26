// import { IconGithub, IconTwitter } from "@/components";
import { Telegram, WhatsApp } from "@mui/icons-material";
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
    discord: "discord",
    email: <Mail {...props} />,
    whatsapp: <WhatsApp {...props} />,
    telegram: <Telegram {...props} />,
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

export const selectIconForLinks = (link: string, size?: number) => {
  if (!link) {
    return socialIcons({ size: size || 16 }).website;
  }

  let type = "website";

  switch (true) {
    case link.includes("github"):
      type = "github";
      break;
    case link.includes("discord"):
      type = "discord";
      break;
    case link.includes("twitter") || link.includes("x.com"):
      type = "twitter";
      break;
    case link.includes("linkedin"):
      type = "linkedin";
      break;
    case link.includes("mail"):
        type = "email";
    break;
    case link.includes("facebook"):
      type = "facebook";
      break;
    case link.includes("instagram"):
      type = "instagram";
      break;
    case link.includes("youtube"):
      type = "youtube";
      break;
    case link.includes("figma"):
      type = "figma";
      break;
    case link.includes("whatsapp") || link.includes("wa.me"):
      type = "whatsapp";
      break;
    case link.includes("telegram") || link.includes("t.me"):
      type = "telegram";
      break;
    default:
      type = "website";
  }

  return socialIcons({ size: size || 16 })[type];
};

type SocialLinkFunction = (username: string) => string;

export const socialLinks: Record<string, SocialLinkFunction> = {
  github: (username: string) => `https://github.com/${username}`,
  twitter: (username: string) => `https://twitter.com/${username}`,
  linkedin: (username: string) => `https://www.linkedin.com/in/${username}`,
  facebook: (username: string) => `https://www.facebook.com/${username}`,
  instagram: (username: string) => `https://www.instagram.com/${username}`,
  youtube: (username: string) => `https://www.youtube.com/user/${username}`,
  figma: (username: string) => `https://www.figma.com/@${username}`,
  whatsapp: (username: string) => `https://wa.me/${username}`,
  telegram: (username: string) => `https://t.me/${username}`,
};
