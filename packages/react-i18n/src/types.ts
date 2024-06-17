import type { ITranslateOptions, Ii18nConfigs } from "@jupri-lab/i18n-core";
import type { ReactNode } from "react";

export interface Ii18nContext<TLanguage extends string> {
  getChangeLanguageHandler: (language: TLanguage) => void;
  getCurrentLanguage: () => TLanguage;
  translate: (identifier: string, data?: ITranslateOptions) => string;
}

export interface Ii18nProviderProps<
  TLanguage extends string,
  TResources extends object,
> {
  children: ReactNode;
  configs: Ii18nConfigs<TLanguage, TResources>;
}
