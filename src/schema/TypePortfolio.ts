import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePortfolioImagesSkeleton } from "./TypePortfolioImages";

export interface TypePortfolioFields {
    entryName?: EntryFieldTypes.Symbol;
    galleries?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypePortfolioImagesSkeleton>>;
}

export type TypePortfolioSkeleton = EntrySkeletonType<TypePortfolioFields, "portfolio">;
export type TypePortfolio<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePortfolioSkeleton, Modifiers, Locales>;

export function isTypePortfolio<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePortfolio<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'portfolio'
}
