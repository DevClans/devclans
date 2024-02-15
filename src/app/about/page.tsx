import { LightLine } from "@/components";
import { selectIconForLinks } from "@/lib/socialIcons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUsPage: React.FC = () => {
  const commonImageProps = {
    style: {
      background:
        "radial-gradient(100% 100% at 50% 0%, rgba(122, 175, 255, 0.04) 71%, rgba(118, 146, 255, 0.00) 100%), radial-gradient(125.79% 100% at 50% 0%, rgba(226, 232, 255, 0.07) 31.5%, rgba(226, 232, 255, 0.02) 100%), rgba(226, 232, 255, 0.01)",
      boxShadow: "0px -28px 84px -24px rgba(226, 232, 255, 0.12)",
    },
    className: "mt-2 p-2 rounded-[5px] md:rounded-[10px] ",
  };

  const team = [
    {
      name: "Kshetez Vinayak",
      src: "https://avatars.githubusercontent.com/u/100942053?v=4",
      bio: "A sportsman at heart who likes to build things that make a difference. If not coding, you can find him playing basketball or video games.",
      links: [
        "https://x.com/kshetezvinayak",
        "https://github.com/auspy",
        "https://www.linkedin.com/in/kshetezvinayak/",
        "https://linktr.ee/kshetezvinayak",
      ],
    },
    {
      name: "Satvik Manchanda",
      src: "https://avatars.githubusercontent.com/u/101499823?v=4",
      bio: "A person defined by his curiosity and thirst for learning. I buy more books than I can finish. I sign up for more online courses then I can complete. I believe that if you stop learning new things you stop doing great and useful things.",
      links: [
        "https://twitter.com/SatvikManchanda",
        "https://github.com/Satvik1769",
        "https://www.linkedin.com/in/satvikmanchanda/",
        "https://linktr.ee/Satvik1769",
      ],
    },
    {
      name: "Siddhant",
      src: "https://avatars.githubusercontent.com/u/101110768?v=4",
      bio: "a full-stack engineer who loves building neat user interfaces that are highly functional, interactive and serve the experience of the application.",
    },
  ];
  const data = [
    {
      heading: (
        <>
          The
          <br /> Problem
        </>
      ),
      desc: "We believe software development is broken today - thousands of tools, hundreds of tabs, and a lack of integration results in a slow, painful development process and a poor developer experience.",
    },
    {
      heading: (
        <>
          What we are
          <br /> building?
        </>
      ),
      desc: "We believe software development is broken today - thousands of tools, hundreds of tabs, and a lack of integration results in a slow, painful development process and a poor developer experience.",
    },
    {
      heading: (
        <>
          Our
          <br /> Mission
        </>
      ),
      desc: "We believe software development is broken today - thousands of tools, hundreds of tabs, and a lack of integration results in a slow, painful development process and a poor developer experience.",
      content: (
        <div className="fcfs w100 mt-6 md:mt-15">
          <h5 className="text-subH">how it all started</h5>
          <Image
            {...{
              ...commonImageProps,
              className: commonImageProps.className + "",
            }}
            src={"/aboutus/discordMsg.png"}
            alt="how it started"
            width={1025}
            height={351}
          />
        </div>
      ),
    },
    {
      heading: (
        <>
          Devclans
          <br /> core team
        </>
      ),
      desc: "We believe software development is broken today - thousands of tools, hundreds of tabs, and a lack of integration results in a slow, painful development process and a poor developer experience.",
      content: (
        <div
          className=" w100 gap-7 flex flex-col  mt-6 md:mt-[100px]"
          style={
            {
              // gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }
          }
        >
          {team.map((member, i) => (
            <TeamMember key={i} {...member} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-2 lg:p-7 w100 max-w-[1040px] fcc gap-[100px]">
      <section className="fcc gap-4 pt-15 ">
        <h1 className="text-[44px]">
          About <span className="h1Highlight">Devclans</span>
        </h1>
        <p className="text-center lg:text-left ">
          Devclans is build by developers met in 100xdevs cohort by Harkirat
          singh
        </p>
        <Link href={"https://x.com/kirat_tw/status/1745624233101713723?s=20"}>
          <Image
            src={"/aboutus/kiratTweet.png"}
            alt="kirat tweet"
            width={639}
            {...commonImageProps}
            height={321}
            priority={true}
          />
        </Link>
      </section>
      <div className="fcfs gap-[100px]">
        {data?.map((item, i) => (
          <>
            <AboutSections key={i} {...item} />
            <LightLine key={i + "a"} />
          </>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;

const AboutSections = ({
  heading,
  desc,
  content,
}: {
  heading: React.ReactNode;
  desc: string;
  content?: React.ReactNode;
}) => {
  if (!(heading && desc)) {
    return null;
  }
  return (
    <section className="w100 fcfs">
      <div className="flex lg:flex-row flex-col items-start lg:justify-between w100 gap-x-[80px] gap-7">
        <div className="">
          <h2
            className="text-subH text-[36px] lg:w-[235px] normal-case"
            style={{
              lineHeight: "115%",
            }}
          >
            {heading}
          </h2>
        </div>

        {desc && <p className="w100">{desc}</p>}
      </div>
      {content && <div className="w100">{content}</div>}
    </section>
  );
};

const TeamMember = ({
  name,
  src,
  bio,
  links,
}: {
  name: string;
  src: string;
  bio: string;
  links?: string[];
}) => {
  // console.log("links", links);
  const commonImageProps = {
    style: {
      background:
        "radial-gradient(100% 100% at 50% 0%, rgba(122, 175, 255, 0.04) 71%, rgba(118, 146, 255, 0.00) 100%), radial-gradient(125.79% 100% at 50% 0%, rgba(226, 232, 255, 0.07) 31.5%, rgba(226, 232, 255, 0.02) 100%), rgba(226, 232, 255, 0.01)",
      boxShadow: "0px -28px 84px -24px rgba(226, 232, 255, 0.12)",
    },
    className: "mt-2 p-1 rounded-[5px] md:rounded-[5px] ",
  };
  return (
    <div className=" !p-2 flex flex-row items-start gap-4">
      <Image
        src={src}
        alt={name}
        width={150}
        height={150}
        {...commonImageProps}
      />
      <div className="fcfs gap-2">
        <div className="frc gap-2">
          {links?.map((link: string, i: number) => (
            <Link
              key={i}
              href={link}
              target="_blank"
              className="cardGrad p-1"
              rel="noreferrer"
            >
              {selectIconForLinks(link)}
            </Link>
          ))}
        </div>
        <div className="fcfs gap-1 w100">
          <h2>{name}</h2>
          <p className="">{bio}</p>
        </div>
      </div>
      {/* <div className="fcc w-[260px] gap-2">
        <ButtonBlue
          label="Connect"
          icon
          className="cardGrad max-w-[200px] w100"
        />
        <ButtonBlue label="Ask A Question" className="max-w-[200px] w100" />
      </div> */}
    </div>
  );
};
