import { client } from "@/contentful";
import { TypeHeroBannerComponentSkeleton } from "@/schema";

export const getHero = async (id: string) => {
  const data = await client.getEntries<TypeHeroBannerComponentSkeleton>({
    "sys.id": id,
  });

  return data;
};
