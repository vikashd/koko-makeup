"use client";

import { Dialog } from "@headlessui/react";
import cx from "classnames";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Mail, NavArrowRight, Phone, Xmark } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { SocialMediaLinks } from "@/app/_components/SocialMediaLinks";
import { type MenuSection } from "@/app/_components/Menu";

interface MobileMenuProps {
  isOpen: boolean;
  sections?: MenuSection[];
}

const menu: Variants = {
  open: {
    transform: "translate3d(0,0,0)",
    transitionTimingFunction: "ease-in-out",
  },
  closed: { transform: "translate3d(100%,0,0)" },
};

export function MobileMenu({ isOpen, sections }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const onClose = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed flex flex-col bg-blue-950 top-0 left-0 w-screen h-dvh overflow-y-auto z-50"
          as={motion.div}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menu}
          exit="closed"
        >
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image
              src="/hero-1080x720.webp"
              className="w-full h-full"
              width="1080"
              height="720"
              alt="Menu background image"
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute top-0 left-0 backdrop-sepia bg-blue-950/95 w-full h-full" />
          </div>
          <div className="sticky top-0 p-4 z-0">
            <Link
              className="flex items-center justify-center bg-blue-900 rounded-full rounded-tl-none w-[60px] h-[60px]"
              href="/"
            >
              <Image
                src="/logo-face.svg"
                alt="Mili Makeup Logo"
                width={64}
                height={82}
                className="max-w-[50%]"
                priority
              />
            </Link>
            <Link
              href={pathname}
              className="group absolute right-4 top-4 p-2 bg-white text-blue-950 active:bg-blue-900 active:text-white hover:bg-blue-900 hover:text-white rounded-full rounded-tr-none z-50"
              title="Close"
              scroll={false}
            >
              <Xmark className="w-6 h-6 group-hover:scale-110 group-hover:rotate-90 transition-transform" />
            </Link>
          </div>
          <div className="relative px-4 pt-32 pb-14 z-0">
            <nav>
              {sections?.map(
                ({
                  id: sectionId,
                  title: sectionTitle,
                  items,
                  url: sectionUrl,
                }) => {
                  return (
                    <ul
                      key={sectionId}
                      className="flex flex-col gap-1 font-light text-xl mb-4"
                    >
                      <li className="mb-3">
                        {sectionTitle &&
                          (sectionUrl ? (
                            <Link href={sectionUrl} className="text-2xl">
                              {sectionTitle}
                            </Link>
                          ) : (
                            <div className="text-2xl">{sectionTitle}</div>
                          ))}
                      </li>
                      {items?.map(({ id, title, url }) => {
                        return (
                          <li key={id} className="flex items-center">
                            <NavArrowRight
                              className="mr-2"
                              width="0.75rem"
                              height="0.75rem"
                            />{" "}
                            <Link
                              href={url}
                              className={cx({ italic: pathname === url })}
                            >
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
              )}
              <ul className="font-light text-xl">
                <li className="mb-3">
                  <Link
                    href="/about"
                    className={cx("text-2xl", {
                      italic: pathname === "/about",
                    })}
                  >
                    About
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/contact"
                    className={cx("text-2xl", {
                      italic: pathname === "/contact",
                    })}
                  >
                    Contact
                  </Link>
                </li>
                <li className="mt-10">
                  <div className="flex gap-2">
                    <Link
                      href="/contact"
                      className="inline-flex w-10 h-10 items-center justify-center bg-blue-800 text-white active:bg-white active:text-blue-800 hover:bg-white hover:text-blue-800 rounded-full rounded-tr-none"
                    >
                      <Mail className="w-6 h-6" />
                    </Link>
                    <Link
                      href="tel:+447903444712"
                      className="inline-flex w-10 h-10 items-center justify-center bg-blue-800 text-white active:bg-white active:text-blue-800 hover:bg-white hover:text-blue-800 rounded-full rounded-tr-none"
                    >
                      <Phone className="w-5 h-5" />
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="sticky bottom-0 p-4 mt-auto z-0">
            <SocialMediaLinks className="justify-center" />
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
