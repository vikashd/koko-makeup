import { getGalleries } from "@/app/_ctf/getGalleries";
import { HeaderMenu, type MenuSection, type MenuItem } from "./Menu";

export default async function MenuSC() {
  const data = await getGalleries({ include: 2, select: ["fields"] });

  const items =
    data.items[0].fields.galleries?.reduce<MenuItem[]>((acc, gallery) => {
      if (!gallery) {
        return acc;
      }

      const {
        sys: { id },
        fields: { entryName },
      } = gallery;

      return acc.concat({ id, title: entryName || "", url: `/gallery/${id}` });
    }, []) || [];

  const sections: MenuSection[] = [
    {
      id: "gallery",
      title: "Gallery",
      items: items,
      url: "/#gallery",
    },
  ];

  return <HeaderMenu sections={sections} />;
}
