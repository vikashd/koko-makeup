import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePortfolioImageFields {
    entryName?: EntryFieldTypes.Symbol;
    thumb: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
}

export type TypePortfolioImageSkeleton = EntrySkeletonType<TypePortfolioImageFields, "portfolioImage">;
export type TypePortfolioImage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePortfolioImageSkeleton, Modifiers, Locales>;

export function isTypePortfolioImage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePortfolioImage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'portfolioImage'
}
