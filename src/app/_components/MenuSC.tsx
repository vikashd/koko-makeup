import { getGalleries } from "@/app/_ctf/getGalleries";
import { HeaderMenu, type MenuItem } from "./Menu";

export default async function MenuSC() {
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

  return <HeaderMenu items={items} />;
}
