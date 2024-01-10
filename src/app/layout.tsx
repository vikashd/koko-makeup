import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import MenuSC from "@/app/_components/MenuSC";
import { besley, inter } from "./fonts";

export const metadata: Metadata = {
  title: {
    template: "Mili - Pro Makeup Artist | %s",
    default: "Mili - Pro Makeup Artist",
  },
  description: "Portfolio website for professional makeup artist Komal Thakkar",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${besley.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <MenuSC />
          {children}
          <Footer />
          {modal}
        </div>
      </body>
    </html>
  );
}
