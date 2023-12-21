import { Metadata } from "next";
import { ModalImage } from "@/app/_components/ModalImage";
import { getPortfolioImage } from "@/app/_ctf/getPortfolioImage";
import { formatPortfolioImageData, toDataURL } from "@/app/_utils";

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

export default async function PortfolioModal({
  params: { id },
}: {
  params: { id: string };
}) {
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
    />
  );
}
