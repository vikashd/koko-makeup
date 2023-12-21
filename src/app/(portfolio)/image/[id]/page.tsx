import { Entry } from "contentful";
import { Metadata } from "next";
import { ModalImage } from "@/app/_components/ModalImage";
import { getPortfolioImage } from "@/app/_ctf/getPortfolioImage";
import { getGalleries } from "@/app/_ctf/getGalleries";
import { formatPortfolioImageData, toDataURL } from "@/app/_utils";
import { TypePortfolioImagesSkeleton } from "@/schema";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const data = await getGalleries({ include: 2 });

  const slugs =
    data.includes?.Entry?.reduce<{ id: string }[]>(
      (
        acc,
        entry: Entry<
          TypePortfolioImagesSkeleton,
          "WITHOUT_UNRESOLVABLE_LINKS",
          string
        >
      ) => {
        entry.fields.images?.forEach((image) => {
          const imageId = image?.sys.id;

          if (imageId) {
            acc.push({ id: imageId });
          }
        });

        return acc;
      },
      []
    ) || [];

  return slugs;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getPortfolioImage(id);
  const image = formatPortfolioImageData(data);

  if (!image) {
    return {};
  }

  return {
    title: `${image.title}`,
  };
}

export default async function PortfolioImage({ params: { id } }: PageProps) {
  const data = await getPortfolioImage(id);
  const image = formatPortfolioImageData(data);

  if (!image) {
    return null;
  }

  const { url, title, description, width, height } = image;
  const imageFile = await toDataURL(`https:${url}?w=20`);

  return (
    <ModalImage
      src={`https:${url}`}
      alt={title || ""}
      width={width || 1000}
      height={height || 1000}
      description={description?.value}
      placeholder="blur"
      blurDataURL={imageFile}
      open
      url="/"
    />
  );
}
