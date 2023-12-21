import { EntriesQueries } from "contentful";
import { client } from "@/contentful";
import { TypePortfolioSkeleton } from "@/schema";

export const getGalleries = async (
  props?: EntriesQueries<TypePortfolioSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
) => {
  const data =
    await client.withoutUnresolvableLinks.getEntries<TypePortfolioSkeleton>({
      "sys.id": "1EuUTFyFxpbopG7pMXUF1P",
      include: 2,
      ...props,
    });

  return data;
};
