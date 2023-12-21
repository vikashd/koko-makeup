import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePortfolioImageSkeleton } from "./TypePortfolioImage";

export interface TypePortfolioImagesFields {
    entryName?: EntryFieldTypes.Symbol;
    images?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePortfolioImageSkeleton>>;
}

export type TypePortfolioImagesSkeleton = EntrySkeletonType<TypePortfolioImagesFields, "portfolioImages">;
export type TypePortfolioImages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePortfolioImagesSkeleton, Modifiers, Locales>;

export function isTypePortfolioImages<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePortfolioImages<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'portfolioImages'
}
