import cx from "classnames";
import { FacebookTag, Instagram } from "iconoir-react";
import Link from "next/link";

interface SocialMediaLinksProps {
  className?: string;
}

export function SocialMediaLinks({ className }: SocialMediaLinksProps) {
  return (
    <ul className={cx("flex", className)}>
      <li>
        <Link
          className="block p-1"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <FacebookTag />
        </Link>
      </li>
      <li>
        <Link
          className="block p-1"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          <Instagram />
        </Link>
      </li>
    </ul>
  );
}
