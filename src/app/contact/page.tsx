import { Contact } from "@/app/_components/Contact";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact",
  };
}

export default function ContactPage() {
  return (
    <main className="pt-64">
      <div className="container mx-auto">
        <h2 className="text-3xl italic">Contact</h2>
        <div className="mt-6 mb-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
