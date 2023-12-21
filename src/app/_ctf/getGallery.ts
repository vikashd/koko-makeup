import { EntriesQueries } from "contentful";
import { client } from "@/contentful";
import { TypePortfolioImagesSkeleton } from "@/schema";

export const getGallery = async (
  props?: EntriesQueries<
    TypePortfolioImagesSkeleton,
    "WITHOUT_UNRESOLVABLE_LINKS"
  >
) => {
  const data =
    await client.withoutUnresolvableLinks.getEntries<TypePortfolioImagesSkeleton>(
      {
        ...props,
      }
    );

  return data;
};
