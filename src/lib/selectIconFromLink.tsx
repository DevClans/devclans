const selectIconFromLink = (link: string) => {
  if (link.includes("youtube")) return "youtube";
  if (link.includes("facebook")) return "facebook";
  if (link.includes("twitter")) return "twitter";
  if (link.includes("instagram")) return "instagram";
  if (link.includes("linkedin")) return "linkedin";
  if (link.includes("github")) return "github";
  if (link.includes("reddit")) return "reddit";
  if (link.includes("x.com")) return "x.com";
  if (link.includes("figma")) return "figma";
  return "link";
};

export default selectIconFromLink;
