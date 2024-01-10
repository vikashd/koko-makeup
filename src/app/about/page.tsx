import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getAbout } from "@/app/_ctf/getAbout";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const data = await getAbout();
  const { entryName, content } = data.items[0].fields;

  return (
    <main className="pt-64">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl italic">{entryName || "About"}</h2>
          <Image
            src="/profile.jpeg"
            className="rounded-full"
            alt="Mili"
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="mt-6 mb-12 max-w-screen-md">
          {documentToReactComponents(content, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (_node, children) => (
                <p className="mb-4">{children}</p>
              ),
            },
          })}
        </div>
      </div>
    </main>
  );
}
