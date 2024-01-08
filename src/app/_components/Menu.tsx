"use client";

import cx from "classnames";
import {
  AnimatePresence,
  Variants,
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Mail, Menu, Phone, Xmark } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SocialMediaLinks } from "./SocialMediaLinks";

interface HeaderMenu {
  children?: React.ReactNode;
  sections?: MenuSection[];
}

interface NavProps {
  className?: string;
  children?: React.ReactNode;
}

export interface MenuSection {
  id: string;
  title?: string;
  items?: MenuItem[];
  url?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
}

const menu: Variants = {
  open: { transform: "translateX(0)" },
  closed: { transform: "translateX(100%)" },
};

export function HeaderMenu({ sections, children }: HeaderMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [largeLogoScope, animateLargeLogo] = useAnimate();
  const [smallLogoScope, animateSmallLogo] = useAnimate();
  const [logoContainerScope, animateLogoContainer] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "60px 0px 0px 0px" });
  const x = useMotionValue(-200);
  const { scrollY } = useScroll();
  const [bgClass, setBgClass] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useMotionValueEvent(scrollY, "change", (value) => {
    setBgClass(value > 60 ? "bg-blue-950" : "");
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isInView) {
      animateLogoContainer(
        logoContainerScope.current,
        { width: "200px", height: "200px" },
        { duration: 0.3, ease: "easeOut" }
      );
      animateLargeLogo(
        largeLogoScope.current,
        { width: "200px", height: "200px", rotate: 0 },
        { duration: 0.3, ease: "easeOut" }
      );
      animateSmallLogo(
        smallLogoScope.current,
        { opacity: 0 },
        { duration: 0.2, delay: 0.1, ease: "easeOut" }
      );
      x.set(-88);
    } else {
      animateLogoContainer(
        logoContainerScope.current,
        { width: "64px", height: "64px" },
        { duration: 0.3, ease: "easeOut", delay: 0.1 }
      );
      animateLargeLogo(
        largeLogoScope.current,
        { width: "64px", height: "64px", rotate: 180 },
        { duration: 0.3, ease: "easeOut", delay: 0.1 }
      );
      animateSmallLogo(
        smallLogoScope.current,
        { opacity: 1 },
        { duration: 0.3, delay: 0.1, ease: "easeOut" }
      );
      x.set(-224);
    }
  }, [
    isInView,
    animateLogoContainer,
    animateLargeLogo,
    animateSmallLogo,
    logoContainerScope,
    largeLogoScope,
    smallLogoScope,
    x,
  ]);

  useEffect(() => {
    if (searchParams.get("menu") !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  return (
    <>
      <div className="fixed w-full top-0 z-40">
        <motion.div
          initial={false}
          className={cx(
            "sticky top-0 md:flex md:items-center bg-opacity-95 transition-colors duration-700 py-3",
            bgClass
          )}
          animate={isOpen ? "open" : "closed"}
        >
          <div className="container mx-auto flex justify-between items-center w-full">
            <div className="w-full items-center justify-between flex">
              <Link
                ref={logoContainerScope}
                className="flex items-center justify-center"
                href="/"
              >
                <div
                  ref={largeLogoScope}
                  className="flex items-center justify-center bg-blue-900 rounded-full rounded-tl-none w-[200px] h-[200px]"
                >
                  <Image
                    src="/logo.svg"
                    alt="Mili Makeup Logo"
                    width={150}
                    height={58}
                    className="max-w-[75%]"
                    priority
                  />
                </div>
                <div
                  ref={smallLogoScope}
                  className="flex absolute items-center justify-center bg-blue-900 rounded-full rounded-br-none w-[60px] h-[60px] opacity-0"
                >
                  <Image
                    src="/logo-face.svg"
                    alt="Mili Makeup Logo"
                    width={64}
                    height={82}
                    className="max-w-[54%]"
                    priority
                  />
                </div>
              </Link>
              <div className="hidden md:block ml-auto">
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <Link href="/#gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <Mail />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <Link
                href="?menu"
                className="block md:hidden"
                shallow
                scroll={false}
              >
                <Menu />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div ref={ref} />
      {children}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="closed"
            className="fixed flex flex-col bg-blue-950 top-0 left-0 w-screen h-dvh overflow-y-auto z-50"
            animate={isOpen ? "open" : "closed"}
            variants={menu}
            exit="closed"
          >
            <div className="absolute top-0 left-0 w-full h-full before:block before:absolute before:backdrop-sepia before:bg-blue-950/95 before:w-full before:h-full">
              <Image
                src="/hero-1080x720.webp"
                className="w-full h-full"
                width="1080"
                height="720"
                alt="Menu background image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="sticky top-0 p-4">
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
                className="group absolute right-4 top-4 p-2 bg-white text-blue-950 rounded-full rounded-tr-none z-50"
                title="Close"
                scroll={false}
              >
                <Xmark className="w-6 h-6 group-hover:scale-110 group-hover:rotate-90 transition-transform" />
              </Link>
            </div>
            <div className="relative px-4 pt-32 pb-14">
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
                        className="flex flex-col gap-1 font-light text-xl mb-3"
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
                            <li key={id}>
                              -{" "}
                              <Link
                                href={url}
                                className={cx({
                                  italic: pathname === url,
                                })}
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
                </ul>
              </nav>
            </div>
            <div className="sticky bottom-0 p-4 mt-auto">
              <SocialMediaLinks className="justify-center" />
              <div className="absolute flex flex-col justify-center right-4 bottom-4">
                <ul className="sticky bottom-0 grid grid-cols-1 gap-2">
                  <li>
                    <Link
                      href="/contact"
                      className="inline-flex p-2 items-center bg-white text-blue-950 rounded-full rounded-tr-none"
                    >
                      <Mail className="w-6 h-6" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="tel:+447903444712"
                      className="inline-flex p-2 items-center bg-white text-blue-950 rounded-full rounded-tr-none"
                    >
                      <Phone className="w-6 h-6" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Nav({ className, children }: NavProps) {
  return (
    <nav className={cx("text-white", className)}>
      <ul className="grid grid-cols-1 gap-4">{children}</ul>
    </nav>
  );
}
