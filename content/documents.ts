import en from "./en.json";
import ja from "./ja.json";

export type Document = { title: string; sections: { title: string; blocks: string[] }[] };
export const documents: Record<"en" | "ja", Record<keyof typeof en, Document>> = { en, ja };
