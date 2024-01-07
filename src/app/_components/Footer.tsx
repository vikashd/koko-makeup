import { Mail, Phone } from "iconoir-react";
import Link from "next/link";
import { SocialMediaLinks } from "@/app/_components/SocialMediaLinks";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-blue-950 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:items-center md:grid-cols-3 gap-2 md:gap-4 pt-8 pb-12 border-t border-y-slate-50/75">
          <div>
            <ul className="inline-flex md:grid md:grid-cols-1 gap-2 md:gap-0">
              <li>
                <Link href="/contact" className="inline-flex items-center p-1">
                  <Mail className="flex-shrink-0 md:mr-2" />{" "}
                  <span className="text-sm hidden md:inline">Contact</span>
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+447903444712"
                  className="inline-flex items-center p-1"
                >
                  <Phone className="flex-shrink-0 md:mr-2" />{" "}
                  <span className="text-sm whitespace-nowrap hidden md:inline">
                    +44 7903 444712
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <SocialMediaLinks className="justify-end md:justify-center" />
          </div>
          <span className="flex mt-4 md:mt-0 justify-end col-span-2 md:col-auto text-xs md:text-sm">
            &copy; {year} Mili Pro Makeup Artist
          </span>
        </div>
      </div>
    </footer>
  );
}
