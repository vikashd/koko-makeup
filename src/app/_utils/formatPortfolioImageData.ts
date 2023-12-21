import { Text } from "@contentful/rich-text-types";
import { getPortfolioImage } from "../_ctf/getPortfolioImage";

export const formatPortfolioImageData = (
  data: Awaited<ReturnType<typeof getPortfolioImage>>
) => {
  const {
    items: [
      {
        fields: { entryName, thumb, description },
      },
    ],
  } = data;

  const file = thumb?.fields.file;

  if (!file) {
    return null;
  }

  const { url, details } = file;
  const descriptionText = description?.content[0].content?.[0] as Text;

  return {
    url,
    title: entryName,
    description: descriptionText,
    width: details.image?.width || 1000,
    height: details.image?.height || 1000,
  };
};
