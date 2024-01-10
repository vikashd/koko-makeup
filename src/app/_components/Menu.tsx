"use client";

import cx from "classnames";
import {
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Mail, Menu } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";

interface HeaderMenu {
  sections?: MenuSection[];
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

export function HeaderMenu({ sections }: HeaderMenu) {
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
                  <ul className="flex items-center gap-4">
                    <li>
                      <Link href="/#gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className={cx(
                          "inline-flex p-2 items-center justify-center rounded-full rounded-tr-none w-10 h-10",
                          {
                            "bg-white text-blue-950 hover:text-white hover:bg-blue-900 transition-colors":
                              pathname !== "/contact",
                          },
                          { "bg-blue-900 text-white": pathname === "/contact" }
                        )}
                      >
                        <Mail width="1.4rem" height="1.4rem" />
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
      <MobileMenu isOpen={isOpen} sections={sections} />
    </>
  );
}
