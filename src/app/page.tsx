import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import GallerySC from "@/app/_components/GallerySC";
import { Hero } from "@/app/_components/Hero";
import { getHero } from "@/app/_ctf/getHero";

export default async function Home() {
  const data = await getHero("7rpK5EyYsbkdBSkKAAyGT6");
  const { intro, homePageIntro } = data.items[0].fields;

  return (
    <>
      <Hero>
        {intro && (
          <div className="grid xs:grid-cols-2 md:grid-cols-3 pt-56 pb-28 md:py-56">
            <p className="font-besley text-black text-sm md:text-base">
              {intro}
            </p>
          </div>
        )}
      </Hero>
      {intro && (
        <div className="container mx-auto mt-10 mb-24">
          {homePageIntro &&
            documentToReactComponents(homePageIntro, {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (_node, children) => (
                  <p className="mb-4">{children}</p>
                ),
              },
            })}
          <div id="gallery" className="pt-16">
            <GallerySC firstRowOnly />
          </div>
        </div>
      )}
    </>
  );
}
