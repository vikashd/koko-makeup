import { Entry } from "contentful";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import { ModalImage } from "@/app/_components/ModalImage";
import { getPortfolioImage } from "@/app/_ctf/getPortfolioImage";
import { getGalleries } from "@/app/_ctf/getGalleries";
import { formatPortfolioImageData, toDataURL } from "@/app/_utils";
import { TypePortfolioImagesSkeleton } from "@/schema";

interface PageProps {
  params: { id: string };
}

const getAndFormatImageData = cache(async (id: string) => {
  const data = await getPortfolioImage(id);
  const image = formatPortfolioImageData(data);

  return image;
});

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

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const image = await getAndFormatImageData(id);

  if (!image) {
    return {};
  }

  const parentMetadata = await parent;

  const description =
    image.description?.value ||
    parentMetadata.openGraph?.description ||
    "Portfolio image";

  return {
    title: `${image.title || parentMetadata.title}`,
    openGraph: {
      description,
      images: `https:${image.url}?w=1200&h=630`,
    },
    twitter: {
      description,
      images: `https:${image.url}?w=1600&h=900`,
    },
  };
}

export default async function PortfolioImage({ params: { id } }: PageProps) {
  const image = await getAndFormatImageData(id);

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
      shareUrl={`${process.env.URL}/image/${id}`}
      url="/"
    />
  );
}
