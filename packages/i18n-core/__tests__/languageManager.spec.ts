import EventManager from "../src/EventManager";
import LanguageManager from "../src/LanguageManager";

describe("LanguageManager", () => {
  let languageManager: LanguageManager<string>;
  let eventManager: EventManager;

  beforeEach(() => {
    // Mock EventManager
    eventManager = new EventManager();

    // Initialize LanguageManager
    languageManager = new LanguageManager({
      enableQueryParams: false,
      initialLanguage: "en",
      languages: ["en", "es", "fr"],
      queryParam: "lang",
    });
  });

  describe("Initialization", () => {
    it("should initialize with the correct initial language", () => {
      expect(languageManager.getCurrentLanguage()).toBe("en");
    });

    it("should return the correct list of languages", () => {
      expect(languageManager.getLanguages()).toEqual(["en", "es", "fr"]);
    });
  });

  describe("getCurrentLanguage", () => {
    it("should return the current language", () => {
      expect(languageManager.getCurrentLanguage()).toBe("en");
    });
  });

  describe("changeLanguage", () => {
    it("should change the current language", () => {
      languageManager.changeLanguage("es", eventManager);
      expect(languageManager.getCurrentLanguage()).toBe("es");
    });

    it("should trigger language_changed event", () => {
      const triggerSpy = jest.spyOn(eventManager, "trigger");
      languageManager.changeLanguage("es", eventManager);
      expect(triggerSpy).toHaveBeenCalledWith("language_changed");
    });

    it("should not trigger language_changed event if language is not changed", () => {
      const triggerSpy = jest.spyOn(eventManager, "trigger");
      languageManager.changeLanguage("en", eventManager);
      expect(triggerSpy).not.toHaveBeenCalled();
    });
  });
});
