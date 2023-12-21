import { Contact } from "@/app/_components/Contact";

export default function ContactPage() {
  return (
    <main className="pt-64">
      <div className="container mx-auto">
        <h2 className="text-3xl">Contact</h2>
        <div className="mt-6 mb-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
