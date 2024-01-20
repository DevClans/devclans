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
  },
  {
    name: "About The Team",
    href: "/",
  },
  {
    name: "contact us",
    href: "/",
  },
];
const Navigation = () => {
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
      {navigation.map(({ href, name, target }, index) => (
        <Link key={index} href={href} target={target}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
