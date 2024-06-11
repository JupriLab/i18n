import TranslationManager from "../src/TranslationManager";
import { escapeHTMLTags } from "../src/utils/escapeHTMLTags.util";
import { interpolate } from "../src/utils/interpolate.util";

jest.mock("../src/utils/escapeHTMLTags.util");
jest.mock("../src/utils/interpolate.util");

describe("TranslationManager", () => {
  const resources = {
    en: {
      farewell: "Goodbye",
      greeting: "Hello",
      nested: {
        message: "Nested message",
      },
    },
    fr: {
      farewell: "Au revoir",
      greeting: "Bonjour",
      nested: {
        message: "Nested message",
      },
    },
  };

  let translationManager: TranslationManager<"en" | "fr", typeof resources.en>;

  beforeEach(() => {
    translationManager = new TranslationManager(resources);
    (escapeHTMLTags as jest.Mock).mockClear();
    (interpolate as jest.Mock).mockClear();
  });

  it("translates an identifier without interpolation and escaping HTML", () => {
    (escapeHTMLTags as jest.Mock).mockReturnValue("Hello");

    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: true,
      identifier: "greeting",
    });

    expect(result).toBe("Hello");
    expect(escapeHTMLTags).toHaveBeenCalledWith("Hello");
  });

  it("translates an identifier without interpolation and without escaping HTML", () => {
    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: false,
      identifier: "greeting",
      interpolation: undefined,
    });

    expect(result).toBe("Hello");
    expect(escapeHTMLTags).not.toHaveBeenCalled();
  });

  it("translates an identifier with interpolation and escaping HTML", () => {
    const interpolation = { name: "John" };
    (interpolate as jest.Mock).mockReturnValue("Hello, John");

    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: true,
      identifier: "greeting",
      interpolation,
    });

    expect(result).toBe("Hello, John");
    expect(interpolate).toHaveBeenCalledWith("Hello", interpolation, true);
  });

  it("translates an identifier with interpolation and without escaping HTML", () => {
    const interpolation = { name: "John" };
    (interpolate as jest.Mock).mockReturnValue("Hello, John");

    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: false,
      identifier: "greeting",
      interpolation,
    });

    expect(result).toBe("Hello, John");
    expect(interpolate).toHaveBeenCalledWith("Hello", interpolation, false);
  });

  it("throws an error if the resource is not initialized", () => {
    const uninitializedTranslationManager = new TranslationManager(undefined);

    expect(() => {
      uninitializedTranslationManager.translate({
        currentLanguage: "en",
        escapeHTML: true,
        identifier: "greeting",
      });
    }).toThrow("i18n resource is not initialized");
  });

  it("translates a nested identifier", () => {
    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: false,
      identifier: "nested.message",
    });

    expect(result).toBe("Nested message");
  });

  it("translates a different language identifier", () => {
    const result = translationManager.translate({
      currentLanguage: "fr",
      escapeHTML: false,
      identifier: "greeting",
    });

    expect(result).toBe("Bonjour");
  });
});
