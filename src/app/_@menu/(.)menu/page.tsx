import { getGalleries } from "@/app/_ctf/getGalleries";
import { type MenuItem } from "@/app/_components/Menu";
import { MobileMenu } from "@/app/_components/MobileMenu";

export default async function MobileMenuSC() {
  const data = await getGalleries({ include: 2, select: ["fields"] });

  const items = data.items[0].fields.galleries?.reduce<MenuItem[]>(
    (acc, gallery) => {
      if (!gallery) {
        return acc;
      }

      const {
        sys: { id },
        fields: { entryName },
      } = gallery;

      return acc.concat({ id, title: entryName || "", url: `/gallery/${id}` });
    },
    []
  );

  return <MobileMenu items={items} />;
}
