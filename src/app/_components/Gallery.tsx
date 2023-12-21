"use client";

import cx from "classnames";
import { Entry } from "contentful";
import { Link as LinkIcon } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TypePortfolioImageSkeleton } from "@/schema";

interface GalleryProps {
  id: string;
  title?: string;
  images: (
    | Entry<TypePortfolioImageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
    | undefined
  )[];
  firstRowOnly?: boolean;
}

export function Gallery({ id, title, images, firstRowOnly }: GalleryProps) {
  const desktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const landscape = useMediaQuery({ query: "(min-width: 1024px)" });
  const portrait = useMediaQuery({ query: "(min-width: 768px)" });
  const [imagesToDisplay, setImagesToDisplay] = useState(images);
  const [columnsDisplayed, setColumnsDisplayed] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (!firstRowOnly) {
      return;
    }

    const values: [key: number, value: boolean][] = [
      [6, desktop],
      [5, landscape],
      [4, portrait],
    ];

    let columns = 3;

    for (let i = 0; i < values.length; i++) {
      const [show, flag] = values[i];

      if (flag) {
        columns = show;
      }
    }

    setColumnsDisplayed(columns);
    setImagesToDisplay(
      images.length > columns - 1 ? images.slice(0, columns) : images
    );
  }, [firstRowOnly, images, desktop, landscape, portrait]);

  return (
    <div className="my-10">
      {title && (
        <div className="flex items-center mb-4">
          <Link className="group" href={`/gallery/${id}`}>
            <h2 className="italic text-3xl md:text-4xl group-hover:underline">
              {title}
            </h2>
          </Link>
          <div className="ml-auto pl-2">
            <Link
              href={`/gallery/${id}`}
              className="block p-2 bg-white text-blue-950 rounded-full rounded-bl-none hover:text-white hover:bg-blue-900 transition-colors"
              scroll
            >
              <LinkIcon width="18" height="18" />
            </Link>
          </div>
        </div>
      )}
      {imagesToDisplay.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3">
          {imagesToDisplay.map((image, i) => {
            if (!image?.fields.thumb?.fields.file) {
              return null;
            }

            const { file } = image.fields.thumb.fields;
            const isLastImage =
              i === imagesToDisplay.length - 1 &&
              columnsDisplayed === imagesToDisplay.length;

            const imageComponent = (
              <Image
                className={cx({
                  "absolute w-full h-full": isLastImage,
                  "relative w-full transition group-hover:grayscale":
                    !isLastImage,
                })}
                src={`https:${file.url}?fit=thumb&w=300&h=300`}
                alt={image.fields.entryName || "Portfolio image"}
                priority
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            );

            if (isLastImage) {
              return (
                <div
                  key={image.sys.id}
                  className="relative rounded-full rounded-tl-none overflow-hidden transform-gpu group"
                >
                  {imageComponent}
                  <Link
                    href={`/gallery/${id}`}
                    className="relative flex items-center justify-center w-full h-full italic text-sm md:text-base text-white backdrop-sepia  bg-blue-900/80 hover:bg-blue-900/90 transition-colors"
                  >
                    More <LinkIcon className="ml-1" width="18" height="18" />
                  </Link>
                </div>
              );
            }

            return (
              <div
                key={image.sys.id}
                className="relative rounded overflow-hidden group"
              >
                <Link
                  className="block"
                  href={`/image/${image.sys.id}`}
                  scroll={false}
                >
                  {imageComponent}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
