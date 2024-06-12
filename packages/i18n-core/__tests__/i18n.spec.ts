import i18n from "../src/i18n";

describe("i18n", () => {
  let i18nInstance: i18n<"en" | "es", { greeting: string }>;

  beforeEach(() => {
    i18nInstance = new i18n({
      languages: ["en", "es"],
      resources: {
        en: { greeting: "Hello" },
        es: { greeting: "Hola" },
      },
    });
  });

  test("initializes with the first language and resources", () => {
    expect(i18nInstance.getCurrentLanguage()).toBe("en");
  });

  test("changes language and triggers event", () => {
    const triggerSpy = jest.spyOn(i18nInstance["eventManager"], "trigger");
    i18nInstance.getChangeLanguageHandler("es");

    expect(i18nInstance.getCurrentLanguage()).toBe("es");
    expect(triggerSpy).toHaveBeenCalledWith("language_changed");
  });

  test("does not change language if already set to that language", () => {
    const triggerSpy = jest.spyOn(i18nInstance["eventManager"], "trigger");
    i18nInstance.getChangeLanguageHandler("en");

    expect(i18nInstance.getCurrentLanguage()).toBe("en");
    expect(triggerSpy).not.toHaveBeenCalled();
  });

  test("throws error when setting unrecognized language", () => {
    // @ts-expect-error Expect error because language fr is not recognized
    expect(() => i18nInstance.getChangeLanguageHandler("fr")).toThrow(
      "Language is not recognized in the supported languages",
    );
  });

  test("translates an identifier without interpolation and without escapeHTML", () => {
    const translation = i18nInstance.translate("greeting", {
      escapeHTML: false,
    });
    expect(translation).toBe("Hello");
  });

  test("translates an identifier with interpolation", () => {
    i18nInstance.translate("greeting", {
      interpolation: { name: "John" },
    });
  });

  test("handles translation with escapeHTML option", () => {
    const translation = i18nInstance.translate("greeting", {
      escapeHTML: true,
    });
    expect(translation).toBe("Hello");
  });

  test("registers an event listener", () => {
    const callback = jest.fn();
    const onSpy = jest.spyOn(i18nInstance["eventManager"], "on");
    i18nInstance.on("language_changed", callback);

    expect(onSpy).toHaveBeenCalledWith("language_changed", callback);
  });
});
