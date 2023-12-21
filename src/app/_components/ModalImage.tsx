"use client";

import { Xmark } from "iconoir-react";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Modal } from "@/app/_components/Modal";

type ModalImageProps = {
  open: boolean;
  description?: string;
  url?: string;
} & React.ComponentProps<typeof Image>;

const imageLoader: ImageLoader = ({ src, width }) => {
  const url = new URL(src);

  const params = url.searchParams;
  params.set("w", `${width}`);

  return url.href;
};

export function ModalImage({
  src,
  width,
  height,
  alt,
  description,
  open,
  url,
  ...rest
}: ModalImageProps) {
  const router = useRouter();

  const onClose = useCallback(() => {
    if (url) {
      router.push(url, { scroll: true });
    } else {
      router.back();
    }
  }, [router, url]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col justify-center w-full h-full p-4">
        <div
          className="absolute w-screen h-screen top-0 left-0"
          onClick={onClose}
        />
        <div
          className="flex flex-col flex-auto max-w-full m-auto justify-center overflow-hidden"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <div className="relative overflow-hidden">
            <Image
              loader={imageLoader}
              className="w-full h-auto"
              src={src}
              width={width}
              height={height}
              alt={alt}
              priority
              sizes="100vw"
              {...rest}
            />
            <button
              className="absolute group top-2 right-2 md:top-4 md:right-4 p-2 bg-blue-950 text-white rounded-full rounded-tr-none"
              title="Close modal"
              onClick={onClose}
            >
              <div className="scale-0 group-hover:scale-100 absolute rounded-full bg-white/10 top-1 right-1 bottom-1 left-1 transition-transform" />
              <Xmark className="w-6 h-6 group-hover:scale-75 group-hover:rotate-90 transition-all" />
            </button>
          </div>
          {description && (
            <div className="bottom-0 bg-white text-slate-900 text-xs md:text-sm text-center p-4 pb-6">
              {description}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
