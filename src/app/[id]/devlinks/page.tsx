import {
  ButtonHero,
  IconWithBg,
  LightRays,
  ProjectImg,
  ProjectLinks,
} from "@/components";
import ImageComp from "@/components/ImageComp";
import ShootingStars from "@/components/ShootingStars";
import ProductImg from "@/components/project/ProjectImg";
import ThemeBasic from "@/components/themes/ThemeBasic";
import ThemeColorful from "@/components/themes/ThemeColorful";
import userAvatar from "@/lib/userAvatar";
import { ListItemProps } from "@/types/list.types";
import { ProjectProps } from "@/types/mongo/project.types";
import { PageProps } from "@/types/page.types";
import { Fetch } from "@/utils/fetchApi";
import { zodDiscordUsername } from "@/zod/zod.common";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params }: PageProps) => {
  const user = params?.id;
  // only works for discord id
  const id = zodDiscordUsername.safeParse(user);
  if (!id.success) {
    return notFound();
  }
  const data = await Fetch({ endpoint: `/user/${id.data}/devlinks` });
  console.log(data);
  if (data?.error || !data) {
    return notFound();
  }
  const theme = data?.theme;
  const isFunky = true;
  // theme === "funky";
  const username = data?.discordDetails?.username;
  const displayName = data?.discordDetails?.global_name;
  const avatar = userAvatar({
    discordId: data?.discordId,
    discordImg: data?.discordDetails?.avatar,
    gitubImg: data?.githubDetails?.avatar_url,
    userProps: data,
  });
  const links: (string | ListItemProps)[] = Object.values(data?.socials || {})
    .filter(Boolean)
    .map((item) => {
      if (typeof item != "string") {
        return item;
      }
      if (item.includes("linkedin")) {
        return {
          text: "Linkedin",
          href: item,
        };
      } else if (item.includes("twitter")) {
        return {
          text: "Twitter",
          href: item,
        };
      }
      return item;
    }) as (string | ListItemProps)[];
  const projectLinks: (string | ListItemProps)[] = data?.ownedProjects?.map(
    (project: ProjectProps) => ({
      skills: project.skills,
      imgs:
        Array.isArray(project.imgs) && project.imgs.length > 0
          ? project.imgs
          : [],
      desc: project.desc,
      text: project.title,
      href: `/project/${project._id}`,
      startIcon: project.imgs?.[0] && (
        // <IconWithBg className="!p-1">
        <ImageComp
          alt={project.title + " | Devclans"}
          src={project.imgs?.[0]}
          width={30}
          height={30}
          style={{
            aspectRatio: "1/1",
          }}
          className=" rounded-[5px]"
        />
        // </IconWithBg>
      ),
    })
  );
  if (data?.githubDetails?.login) {
    links.push({
      text: data.githubDetails.login,
      href: `https://github.com/${data.githubDetails.login}`,
    });
  }
  if (data?.email) {
    links.push({
      text: "Email",
      href: `mailto:${data.email}`,
    });
  }
  if (data?.discordDetails?.username) {
    links.push({
      text: "Discord",
      href: `https://discord.com/users/${data.discordId}`,
    });
  }
  links.push({
    text: "Devclans | The Dev Profile",
    href: `https://devclans.com/${id.data}`,
  });
  const themeProps = {
    avatar: avatar,
    displayName: displayName,
    username: username,
    links: links,
    projectLinks: projectLinks,
  };
  return <ThemeColorful {...themeProps} />;
  if (theme == "colorful") {
  } else {
    return <ThemeBasic {...themeProps} />;
  }
};

export default page;
