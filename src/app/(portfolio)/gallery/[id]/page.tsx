import { ArrowUpLeft } from "iconoir-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getGallery } from "@/app/_ctf/getGallery";
import { Gallery as GalleryThumbs } from "@/app/_components/Gallery";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getGallery({ "sys.id": id });

  const {
    fields: { entryName, images },
  } = data.items[0];

  const parentMetadata = await parent;
  const facebookImage = parentMetadata.openGraph?.images;
  const twitterImage = parentMetadata.twitter?.images;
  const imageUrl = images?.[0]?.fields.thumb?.fields.file?.url;

  return {
    title: `Gallery | ${entryName}`,
    openGraph: {
      images: imageUrl ? `https:${imageUrl}?w=1200&h=630` : facebookImage,
    },
    twitter: {
      images: imageUrl ? `https:${imageUrl}?w=1600&h=900` : twitterImage,
    },
  };
}

export default async function Gallery({ params }: PageProps) {
  const data = await getGallery({ "sys.id": params.id });

  const {
    fields: { images = [], entryName },
  } = data.items[0];

  return (
    <main className="pt-64">
      <div className="container mx-auto">
        <Link href="/" className="inline-block -mb-2">
          <ArrowUpLeft />
        </Link>
        <h2 className="text-3xl italic">{entryName}</h2>
        <GalleryThumbs id={params.id} images={images} />
      </div>
    </main>
  );
}
