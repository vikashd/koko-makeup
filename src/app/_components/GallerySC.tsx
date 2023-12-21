import { Gallery } from "@/app/_components/Gallery";
import { getGalleries } from "@/app/_ctf/getGalleries";

interface GallerySCProps {
  firstRowOnly?: boolean;
}

export default async function GallerySC({ firstRowOnly }: GallerySCProps) {
  const data = await getGalleries();

  return data.items.map(({ sys, fields: { galleries } }) => {
    return (
      <div key={sys.id}>
        {galleries?.map((gallery) => {
          if (!gallery) {
            return null;
          }

          const { sys, fields } = gallery;

          return (
            <Gallery
              key={sys.id}
              id={sys.id}
              title={fields.entryName}
              images={fields.images || []}
              firstRowOnly={firstRowOnly}
            />
          );
        })}
      </div>
    );
  });
}
