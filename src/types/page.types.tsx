export type PageProps = Partial<{
  params: Record<string, string | string[] | undefined>;
  searchParams?: { [key: string]: string | string[] | undefined };
}>;
