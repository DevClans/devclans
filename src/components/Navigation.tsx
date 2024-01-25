import { PageProps } from "@/types/page.types";
import Link from "next/link";
const navigation = [
  // {
  //   name: "Home",
  //   href: "/",
  // },
  {
    name: "Find Projects",
    href: "/explore",
  },
  {
    name: "Find Coder Bhai",
    href: "/explore",
    searchParams: {
      type: "users",
    },
  },
  {
    name: "About 100xDevs",
    href: "https://100xdevs.com/",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    name: "About The Team",
    href: "/about-us",
  },
  {
    name: "contact us",
    href: "/contact-us",
  },
];
const Navigation = ({ searchParams }: PageProps) => {
  return (
    <div
      id="navbar"
      className="card frcsb"
      style={{
        padding: "15px 40px",
        gap: "30px",
        borderRadius: "20px",
        border: "1px solid var(--border, #132341)",
        background: "rgba(8, 17, 33, 0.12)",
        boxShadow:
          "0px 4px 5.3px 0px rgba(20, 26, 37, 0.20) inset, 0px -4px 3px 0px rgb(6, 12, 24, 0.10) inset",
        backdropFilter: "blur(27.100000381469727px)",
      }}
    >
      {navigation.map(
        ({ href, searchParams: sp, name, target, rel }, index) => {
          let hreff = href;
          const newParams = new URLSearchParams();
          if (sp) {
            for (const key in sp) {
              newParams.set(key, sp.type);
            }
            hreff = "/explore?" + newParams.toString();
          }
          return (
            <Link key={index} href={hreff} rel={rel} target={target}>
              {name}
            </Link>
          );
        }
      )}
    </div>
  );
};

export default Navigation;
