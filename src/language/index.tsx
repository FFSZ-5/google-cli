import en from "./en.json";
import zh from "./zh.json";

export interface languageType {
  [key: string]: languageItemType;
}
export interface languageItemType {
  [key: string]: string;
}
export default {
  en,
  zh,
} as languageType;
