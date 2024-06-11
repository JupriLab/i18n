import EventManager from "./EventManager";
import LanguageManager from "./LanguageManager";
import TranslationManager from "./TranslationManager";
import type { ITranslateOptions, Ii18nConfigs, TEvents } from "./types";

class i18n<
  TLanguage extends string,
  TResources extends object,
  TPredefinedEvents extends string = TEvents,
> {
  private languageManager: LanguageManager<TLanguage>;
  private eventManager: EventManager<TPredefinedEvents>;
  private translationManager: TranslationManager<TLanguage, TResources>;

  constructor(configs: Ii18nConfigs<TLanguage, TResources>) {
    const { enableQueryParams = false, queryParam = "lang" } = configs;
    this.eventManager = new EventManager();
    this.languageManager = new LanguageManager({
      enableQueryParams,
      initialLanguage: configs.languages[0],
      languages: configs.languages,
      queryParam,
    });
    this.translationManager = new TranslationManager(configs.resources);
  }

  getCurrentLanguage() {
    return this.languageManager.getCurrentLanguage();
  }

  getChangeLanguageHandler(language?: TLanguage) {
    if (language && !this.languageManager.getLanguages().includes(language))
      throw new Error("Language is not recognized in the supported languages");
    if (language)
      this.languageManager.changeLanguage(language, this.eventManager);
  }

  translate(
    identifier: string,
    data: ITranslateOptions = { escapeHTML: true },
  ) {
    const { escapeHTML = true, interpolation } = data;
    return this.translationManager.translate({
      currentLanguage: this.languageManager.getCurrentLanguage(),
      escapeHTML,
      identifier,
      interpolation,
    });
  }

  on(eventName: TPredefinedEvents, callback: () => any) {
    this.eventManager.on(eventName, callback);
  }
}

export default i18n;
