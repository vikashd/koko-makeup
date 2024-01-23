import { ArrowUpLeft } from "iconoir-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { Gallery as GalleryThumbs } from "@/app/_components/Gallery";
import { getGallery } from "@/app/_ctf/getGallery";
import { getGalleries } from "@/app/_ctf/getGalleries";

interface PageProps {
  params: { id: string };
}

const getGalleryData = cache(async (id: string) => {
  return await getGallery({ "sys.id": id });
});

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getGalleryData(id);

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

export async function generateStaticParams() {
  const data = await getGalleries({ include: 1, select: ["fields"] });

  return (
    data.items[0].fields.galleries?.reduce<{ id: string }[]>((acc, gallery) => {
      return gallery ? acc.concat({ id: gallery.sys.id }) : acc;
    }, []) || []
  );
}

export default async function Gallery({ params: { id } }: PageProps) {
  const data = await getGalleryData(id);

  const {
    fields: { images = [], entryName },
  } = data.items[0];

  return (
    <main className="pt-64">
      <div className="container mx-auto">
        <Link href="/#gallery" className="inline-block -mb-2">
          <ArrowUpLeft />
        </Link>
        <h2 className="text-3xl italic">{entryName}</h2>
        <GalleryThumbs id={id} images={images} />
      </div>
    </main>
  );
}
