import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import MenuSC from "@/app/_components/MenuSC";
// import { MyMenu } from "@/app/_components/MyMenu";
import { besley, inter } from "./fonts";

export const metadata: Metadata = {
  title: {
    template: "Mili - Pro Makeup Artist | %s",
    default: "Mili - Pro Makeup Artist",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
  menu,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  menu: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${besley.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <MenuSC />
          {/* <MyMenu>{menu}</MyMenu> */}
          {children}
          <Footer />
          {modal}
        </div>
      </body>
    </html>
  );
}
