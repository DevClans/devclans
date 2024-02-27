import { PageProps } from "@/types/page.types";
import Link from "next/link";
const navigation = [
  {
    name: "Find Projects",
    href: "/explore/projects",
  },
  {
    name: "Find Friends",
    href: "/explore/users",
  },
  {
    name: "About 100xDevs",
    href: "https://100xdevs.com/",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Connect",
    href: "/connect",
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
          padding: "5px",
          maxHeight: "47px",
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
              className={`px-3 navItem rounded-[20px] flex-shrink-0 text-nowrap ${
                replaceStyle ? "w100 py-3" : "py-2"
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
