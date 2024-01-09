"use client";

import cx from "classnames";
import { AnimatePresence, DraggableProps, motion } from "framer-motion";
import { Xmark } from "iconoir-react";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Info } from "@/app/_components/icons/Info";
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
  ...props
}: ModalImageProps) {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [y, setY] = useState(0);
  const desktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const openDescription = useCallback(() => {
    setUpdate(true);
    // setDragProps(undefined);
    setY(-120);
  }, []);

  const closeDescription = useCallback(() => {
    setUpdate(false);
    // setDragProps(dragSettings);
    setY(0);
  }, []);

  const dragProps = useMemo(() => {
    const settings: DraggableProps | undefined =
      !desktop && !update && description
        ? {
            drag: "y",
            dragConstraints: { top: 0, bottom: 0 },
            dragElastic: { bottom: 0, top: 0.3 },
            onDrag: (_e, { offset }) => {
              if (offset.y <= -100) {
                openDescription();
              }
            },
          }
        : undefined;

    return settings;
  }, [desktop, , update, description, openDescription]);

  useEffect(() => {
    if (desktop) {
      closeDescription();
    }
  }, [desktop, closeDescription]);

  // const [dragProps, setDragProps] = useState<DraggableProps | undefined>(
  //   description ? dragSettings : undefined
  // );

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
          <motion.div
            className="relative overflow-hidden"
            animate={{ y }}
            transition={{ bounce: 0.4 }}
            {...dragProps}
          >
            <Image
              loader={imageLoader}
              className={cx("w-full h-auto transition", { grayscale: update })}
              src={src}
              width={width}
              height={height}
              alt={alt}
              priority
              sizes="100vw"
              draggable={false}
              {...props}
              onMouseDown={update ? closeDescription : undefined}
            />
            <button
              className="absolute flex items-center justify-center group top-2 right-2 md:top-4 md:right-4 w-10 h-10 bg-blue-950 text-white rounded-full rounded-tr-none hover:bg-blue-900"
              title="Close modal"
              onClick={onClose}
            >
              <Xmark className="w-6 h-6 group-hover:scale-75 group-hover:rotate-90 transition-all" />
            </button>
            {description && (
              <button
                className="absolute flex items-center justify-center bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 sm:w-10 sm:h-10 bg-blue-950 text-white rounded-full rounded-br-none lg:hidden hover:bg-blue-900"
                onClick={openDescription}
              >
                <Info className="w-3 h-3  sm:w-4 sm:h-4" />
              </button>
            )}
          </motion.div>
          {description && (
            <div className="hidden lg:block bottom-0 bg-white text-slate-900 text-xs md:text-sm text-center p-4 pb-6">
              {description}
            </div>
          )}
          {description && (
            <AnimatePresence>
              {update && (
                <motion.div
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateY(0)" }}
                  exit={{ transform: "translateY(100%)" }}
                  className="lg:hidden absolute bottom-0 left-0 w-full max-h-full bg-white text-slate-900 text-sm p-2 rounded-tl-[4px] rounded-tr-[4px] overflow-auto"
                >
                  <div className="sticky top-0 w-full">
                    <button
                      className="absolute flex items-center justify-center group top-0 right-0 w-8 h-8"
                      title="Close description"
                      onClick={closeDescription}
                    >
                      <Xmark className="w-5 h-6 group-hover:scale-75 group-hover:rotate-90 transition-all" />
                    </button>
                  </div>
                  <div className="p-2 pt-12 pb-20 pr-9">{description}</div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Modal>
  );
}
