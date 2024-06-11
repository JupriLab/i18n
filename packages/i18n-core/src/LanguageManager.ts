import type EventManager from "./EventManager";
import { appendQueryParams } from "./utils/appendQueryParams.util";

export default class LanguageManager<TLanguage extends string> {
  private languages: TLanguage[];
  private currentLanguage: TLanguage;
  private queryParam = "lang";
  private enableQueryParams = false;

  constructor(args: {
    enableQueryParams: boolean;
    initialLanguage: TLanguage;
    languages: TLanguage[];
    queryParam: string;
  }) {
    this.currentLanguage = args.initialLanguage;
    this.languages = args.languages;
    this.enableQueryParams = args.enableQueryParams;
    this.queryParam = args.queryParam;
  }

  getLanguages() {
    return this.languages;
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

  changeLanguage(language: TLanguage, eventManager: EventManager<string>) {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      if (this.enableQueryParams) appendQueryParams(this.queryParam, language);
      eventManager.trigger("language_changed");
    }
  }
}
