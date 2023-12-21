"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { usePathname } from "next/navigation";

export function MyMenu({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {pathname === "/menu" && (
        <motion.div
          className="fixed w-screen h-screen bg-blue-900 z-50"
          initial={{ transform: "translateX(100%)" }}
          animate={{ transform: "translateX(0)" }}
          exit={{ transform: "translateX(100%)" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
