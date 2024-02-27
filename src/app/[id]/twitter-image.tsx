import generateUserMetaImg from "@/utils/generateMetaImg";

export const contentType = "image/png";
export default async function Image({ params }: { params: { id: string } }) {
  return generateUserMetaImg({ params });
}
