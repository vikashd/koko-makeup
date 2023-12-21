"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

interface HeroProps {
  children?: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  const { scrollY } = useScroll();
  const [maxScroll, setMaxScroll] = useState(500);
  const y = useTransform(scrollY, [0, maxScroll], [0, 100]);
  const yPos = useTransform(y, (value) => `${value}px`);

  useEffect(() => {
    setMaxScroll(window.innerHeight / 2);
  }, []);

  return (
    <div className="relative flex items-end md:items-center justify-center min-h-[100vh] overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full"
        style={{
          y: yPos,
          height: "calc(100% + 100px)",
        }}
      >
        <Image
          src="/hero-1080x720.png"
          className="absolute w-full h-full"
          style={{
            objectFit: "cover",
          }}
          width="1080"
          height="720"
          alt="Hero"
          unoptimized
          priority
        />
      </motion.div>
      <div className="container relative">{children}</div>
    </div>
  );
}
