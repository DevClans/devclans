export type PageProps = Partial<{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}>;
