import { client } from "@/contentful";
import { TypeAboutSkeleton } from "@/schema";

export const getAbout = async () => {
  const data = await client.getEntries<TypeAboutSkeleton>({
    "sys.id": "2QlKtkPFyPDMuYgJJWHKXk",
  });

  return data;
};
