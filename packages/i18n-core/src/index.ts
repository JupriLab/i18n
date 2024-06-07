import EventManager from "./EventManager";
import type { ILooseObject, Ii18nConfigs } from "./types";

class i18n<TLanguage extends string, TResources extends object> {
  private languages: TLanguage[] = [];
  private resources: Record<TLanguage, TResources> | undefined;
  private queryParam = "lang";
  private enableQueryParams = false;
  private eventManager = new EventManager();
  constructor(configs: Ii18nConfigs<TLanguage, TResources>) {
    Object.assign(this, configs);
  }

  getCurrentLanguage() {
    if (this.enableQueryParams) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(this.queryParam);
    }

    return localStorage.getItem(this.queryParam);
  }

  getChangeLanguageHandler(language?: TLanguage) {
    if (language && !this.languages.includes(language))
      throw new Error("Language is not recognized in the supported languages");
    if (typeof window === "undefined")
      throw new Error("Environment other than browser is not supported");

    const currentLanguage = this.getCurrentLanguage() || this.languages[0];
    const nextLanguage = language || currentLanguage;

    // To avoid spamming
    if (currentLanguage === language) return;

    if (this.enableQueryParams) {
      const newURL = new URL(window.location.href);
      newURL.searchParams.set(this.queryParam, nextLanguage);
      window.history.replaceState({}, "", newURL.href);
    }

    localStorage.setItem(this.queryParam, nextLanguage);
    this.eventManager.trigger("language_changed");
  }

  translate(identifier: string, _options = {}) {
    const parts = identifier.split(".");
    const currentLanguage = this.getCurrentLanguage() || this.languages[0];
    const currentTranslation = (this.resources as ILooseObject)[
      currentLanguage
    ];
    let currentObject = currentTranslation;

    if (currentTranslation && currentLanguage) {
      for (const part of parts) {
        currentObject = currentObject[part as keyof typeof currentObject];
      }
      return currentObject as string;
    }
    throw new Error("i18n resource is not initialized");
  }

  on(eventName: "language_changed", callback: () => any) {
    this.eventManager.on(eventName, callback);
  }
}

export default i18n;
