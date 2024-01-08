import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAboutFields {
    entryName?: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
}

export type TypeAboutSkeleton = EntrySkeletonType<TypeAboutFields, "about">;
export type TypeAbout<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAboutSkeleton, Modifiers, Locales>;

export function isTypeAbout<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAbout<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'about'
}
