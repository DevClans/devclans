import { PageProps } from "@/types/page.types";
import Link from "next/link";
const navigation = [
  // {
  //   name: "Home",
  //   href: "/",
  // },
  {
    name: "Find Projects",
    href: "/explore/projects",
  },
  {
    name: "Find Coder Bhai",
    href: "/explore/users",
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
const Navigation = ({
  searchParams,
  className,
  replaceStyle,
  replaceClassname,
}: PageProps & {
  className?: string;
  replaceStyle?: React.CSSProperties;
  replaceClassname?: string;
}) => {
  return (
    <div
      id="navbar"
      className={
        replaceClassname ||
        "card cardHeader flex-row items-center justify-between " + className
      }
      style={
        replaceStyle || {
          padding: "15px 40px",
          gap: "30px",
        }
      }
    >
      {navigation.map(
        ({ href, searchParams: sp, name, target, rel }: any, index) => {
          let hreff = href;
          const newParams = new URLSearchParams();
          if (sp) {
            for (const key in sp) {
              newParams.set(key, sp.type);
            }
            hreff = href + "?" + newParams.toString();
          }
          return (
            <Link
              title={name}
              key={index}
              className={`flex-shrink-0 text-nowrap ${
                replaceStyle && "w100 py-3"
              }`}
              href={hreff}
              rel={rel}
              target={target}
            >
              {name}
            </Link>
          );
        }
      )}
    </div>
  );
};

export default Navigation;
