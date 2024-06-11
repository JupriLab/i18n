import EventManager from "./EventManager";
import type { ILooseObject, ITranslateOptions, Ii18nConfigs } from "./types";
import { appendQueryParams } from "./utils/appendQueryParams.util";
import { escapeHTMLTags } from "./utils/escapeHTMLTags.util";
import { interpolate } from "./utils/interpolate.util";

class i18n<TLanguage extends string, TResources extends object> {
  private languages: TLanguage[] = [];
  private resources: Record<TLanguage, TResources> | undefined;
  private queryParam = "lang";
  private enableQueryParams = false;
  private eventManager = new EventManager();
  private currentLanguage: TLanguage;

  constructor(configs: Ii18nConfigs<TLanguage, TResources>) {
    this.currentLanguage = configs.languages[0];
    Object.assign(this, configs);
  }

  getCurrentLanguage() {
    if (this.enableQueryParams) {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get(this.queryParam) as TLanguage;
      if (param) {
        this.currentLanguage = param;
      }
    }

    return this.currentLanguage;
  }

  getChangeLanguageHandler(language?: TLanguage) {
    if (language && !this.languages.includes(language))
      throw new Error("Language is not recognized in the supported languages");

    if (this.currentLanguage === language) return;

    if (language) {
      this.currentLanguage = language;
      if (this.enableQueryParams) appendQueryParams(this.queryParam, language);
      this.eventManager.trigger("language_changed");
    }
  }

  translate(
    identifier: string,
    data: ITranslateOptions = { escapeHTML: true },
  ) {
    const { escapeHTML = true, interpolation } = data;
    const parts = identifier.split(".");
    const currentTranslation = (this.resources as ILooseObject)[
      this.getCurrentLanguage()
    ];

    let currentObject = currentTranslation;

    if (currentTranslation) {
      for (const part of parts) {
        currentObject = currentObject[part as keyof typeof currentObject];
      }

      if (interpolation)
        return interpolate(currentObject, interpolation, escapeHTML);

      return escapeHTML
        ? escapeHTMLTags(currentObject as string)
        : (currentObject as string);
    }
    throw new Error("i18n resource is not initialized");
  }

  on(eventName: "language_changed", callback: () => any) {
    this.eventManager.on(eventName, callback);
  }
}

export default i18n;
