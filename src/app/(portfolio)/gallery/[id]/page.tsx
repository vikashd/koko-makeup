import { ArrowUpLeft } from "iconoir-react";
import { Metadata } from "next";
import Link from "next/link";
import { getGallery } from "@/app/_ctf/getGallery";
import { Gallery as GalleryThumbs } from "@/app/_components/Gallery";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getGallery({ "sys.id": id });

  const {
    fields: { entryName },
  } = data.items[0];

  return {
    title: `Gallery | ${entryName}`,
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
        <div className="flex items-center">
          <h2 className="text-3xl italic">{entryName}</h2>
        </div>
        <GalleryThumbs id={params.id} images={images} />
      </div>
    </main>
  );
}
