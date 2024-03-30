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
  if (data?.error) {
    return notFound();
  }
  const username = data?.discordDetails?.username;
  const displayName = data?.discordDetails?.global_name;
  const avatar = userAvatar({
    discordId: data?.discordId,
    discordImg: data?.discordDetails?.avatar,
    gitubImg: data?.githubDetails?.avatar_url,
    userProps: data,
  });
  const links: (string | ListItemProps)[] = Object.values(
    data?.socials || {}
  ).filter(Boolean) as (string | ListItemProps)[];
  const projectLinks: (string | ListItemProps)[] = data?.ownedProjects?.map(
    (project: ProjectProps) => ({
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
    text: "Devclans",
    href: `https://devclans.com/${id.data}`,
  });
  return (
    <div className="w100 relative fcc min-h-screen overflow-hidden">
      <LightRays imgClassName="scale" opacity={0.8} style={{}} />
      <ShootingStars />
      <div className="max-w-[600px] w100 fcc p-3 mt-6 mb-[15vh] gap-6">
        <ProductImg
          src={avatar}
          isUser={true}
          className={`-mb-3`}
          style={{
            alignSelf: "center",
            aspectRatio: "1/1",
            objectFit: "cover",
            height: "120px",
            width: "120px",
            borderRadius: "20px",
          }}
        />
        <div className=" w100 fcc overflow-hidden">
          <h1
            className={` text-[36px] !text-left text-ellipsis overflow-hidden`}
          >
            {displayName || username}
          </h1>
          {username && (
            <p className="text-subH text-ellipsis overflow-hidden">
              @{username}
            </p>
          )}
        </div>
        <ProjectLinks
          className="!backdrop-blur"
          heading={"Socials"}
          links={links}
        />
        <ProjectLinks
          className="!backdrop-blur"
          links={projectLinks}
          needIconBg={false}
        />
        <ButtonHero
          href="/"
          className="fixed bottom-[5vh]"
          label="Create Your Devlink"
        />
      </div>
    </div>
  );
};

export default page;
