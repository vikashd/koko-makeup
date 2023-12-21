import GallerySC from "@/app/_components/GallerySC";
import { Hero } from "@/app/_components/Hero";
import { getHero } from "@/app/_ctf/getHero";

export default async function Home() {
  const data = await getHero("7rpK5EyYsbkdBSkKAAyGT6");
  const intro = data.items[0].fields.intro;

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
          <div>
            <p className="mb-6">{intro}</p>
            <p className="mb-6">
              Nunc tristique vestibulum interdum. Vestibulum eget ultricies
              metus. Phasellus et eleifend nisi, ut sodales velit. Fusce dapibus
              placerat sapien eu commodo. Pellentesque ullamcorper molestie
              ligula eu tristique. Vestibulum congue sem ex, imperdiet dignissim
              neque placerat scelerisque. Aenean vitae tristique tortor.
            </p>
          </div>
          <GallerySC firstRowOnly />
        </div>
      )}
    </>
  );
}
