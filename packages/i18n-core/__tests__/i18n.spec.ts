import i18n from "../src/i18n";
import { escapeHTMLTags } from "../src/utils/escapeHTMLTags.util";
import { interpolate } from "../src/utils/interpolate.util";

jest.mock("../src/utils/appendQueryParams.util");
jest.mock("../src/utils/escapeHTMLTags.util");
jest.mock("../src/utils/interpolate.util");

describe("i18n", () => {
  let i18nInstance: i18n<"en" | "es", { greeting: string }>;

  beforeEach(() => {
    jest.clearAllMocks();
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
    (interpolate as jest.Mock).mockImplementation(
      (str, _data, _escapeHTML) => str,
    );
    i18nInstance.translate("greeting", {
      interpolation: { name: "John" },
    });
    expect(interpolate).toHaveBeenCalledWith("Hello", { name: "John" }, true);
  });

  test("handles translation with escapeHTML option", () => {
    (escapeHTMLTags as jest.Mock).mockReturnValue("Hello");
    const translation = i18nInstance.translate("greeting", {
      escapeHTML: true,
    });
    expect(translation).toBe("Hello");
    expect(escapeHTMLTags).toHaveBeenCalledWith("Hello");
  });

  test("registers an event listener", () => {
    const callback = jest.fn();
    const onSpy = jest.spyOn(i18nInstance["eventManager"], "on");
    i18nInstance.on("language_changed", callback);

    expect(onSpy).toHaveBeenCalledWith("language_changed", callback);
  });
});
