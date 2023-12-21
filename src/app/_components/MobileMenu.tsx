"use client";

import cx from "classnames";
import { Mail, Phone, Xmark } from "iconoir-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { type MenuItem } from "./Menu";
import { SocialMediaLinks } from "./SocialMediaLinks";

interface MobileMenuProps {
  items?: MenuItem[];
}

interface NavProps {
  className?: string;
  children?: React.ReactNode;
}

export function MobileMenu({ items }: MobileMenuProps) {
  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div
      className="bg-slate-800 bg-opacity-95 fixed top-0 left-0 w-screen h-screen px-4 pt-20 pb-14"
      style={{
        background:
          "linear-gradient(rgba(23, 37, 84, 0.95), rgba(23, 37, 84, 0.95)), url('/sample.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <button
        className="group fixed right-4 top-4 p-2 bg-white text-blue-950 rounded-full rounded-tr-none"
        onClick={onClose}
      >
        <Xmark className="w-6 h-6 group-hover:scale-110 group-hover:rotate-90 transition-transform" />
      </button>
      <Nav className="font-light text-xl mt-16">
        <>
          {items?.map(({ id, title, url }) => {
            return (
              <li key={id}>
                <Link href={url} className="italic">
                  {title}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="mailto:vikash.deepchand@gmail.com"
              className="flex items-center"
            >
              <Mail className="mr-4" /> <span>mili@makeup.com</span>
            </Link>
          </li>
          <li>
            <Link href="tel:+442085555555" className="flex items-center">
              <Phone className="mr-4" /> <span>+44 (0)208 555 5555</span>
            </Link>
          </li>
        </>
      </Nav>
      <SocialMediaLinks className="absolute left-0 right-0 bottom-0 p-4 justify-center" />
    </div>
  );
}

function Nav({ className, children }: NavProps) {
  return (
    <nav className={cx("text-white", className)}>
      <ul className="grid grid-cols-1 gap-4">{children}</ul>
    </nav>
  );
}
