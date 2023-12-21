import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeHeroBannerComponentFields {
    entryName?: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    intro?: EntryFieldTypes.Symbol;
}

export type TypeHeroBannerComponentSkeleton = EntrySkeletonType<TypeHeroBannerComponentFields, "heroBannerComponent">;
export type TypeHeroBannerComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHeroBannerComponentSkeleton, Modifiers, Locales>;

export function isTypeHeroBannerComponent<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHeroBannerComponent<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'heroBannerComponent'
}
