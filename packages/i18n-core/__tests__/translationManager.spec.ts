import TranslationManager from "../src/TranslationManager";

describe("TranslationManager", () => {
  const resources = {
    en: {
      greeting: "Hello",
      greetingInterpolate: "Hello, [name]",
      nested: {
        message: "Nested message",
      },
    },
    fr: {
      greeting: "Bonjour",
      greetingInterpolate: "Hello, [name]",
      nested: {
        message: "Nested message",
      },
    },
  };

  let translationManager: TranslationManager<"en" | "fr", typeof resources.en>;

  beforeEach(() => {
    translationManager = new TranslationManager(resources);
  });

  it("translates an identifier without interpolation and escaping HTML", () => {
    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: true,
      identifier: "greeting",
    });

    expect(result).toBe("Hello");
  });

  it("translates an identifier without interpolation and without escaping HTML", () => {
    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: false,
      identifier: "greeting",
      interpolation: undefined,
    });

    expect(result).toBe("Hello");
  });

  it("translates an identifier with interpolation and escaping HTML", () => {
    const interpolation = { name: "<p>John</p>" };
    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: true,
      identifier: "greetingInterpolate",
      interpolation,
    });

    expect(result).toBe("Hello, &lt;p&gt;John&lt;&#47;p&gt;");
  });

  it("translates an identifier with interpolation and without escaping HTML", () => {
    const interpolation = { name: "John" };

    const result = translationManager.translate({
      currentLanguage: "en",
      escapeHTML: false,
      identifier: "greetingInterpolate",
      interpolation,
    });

    expect(result).toBe("Hello, John");
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
