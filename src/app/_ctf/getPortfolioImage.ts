import { client } from "@/contentful";
import { TypePortfolioImageSkeleton } from "@/schema";

export const getPortfolioImage = async (id: string) => {
  const data =
    await client.withoutUnresolvableLinks.getEntries<TypePortfolioImageSkeleton>(
      {
        "sys.id": id,
        include: 2,
      }
    );

  return data;
};
