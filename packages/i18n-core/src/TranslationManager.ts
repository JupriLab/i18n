import type { ILooseObject } from "./types";

export default class TranslationManager<
  TLanguage extends string,
  TResources extends object,
> {
  private resources: Record<TLanguage, TResources> | undefined;

  constructor(resources: Record<TLanguage, TResources> | undefined) {
    this.resources = resources;
  }

  translate(params: {
    currentLanguage: TLanguage;
    escapeHTML: boolean;
    identifier: string;
    interpolation?: any;
  }) {
    try {
      const currentTranslation = (this.resources as any)[
        params.currentLanguage
      ];
      if (currentTranslation) {
        const parts = params.identifier.split(".");
        let currentObject: any = currentTranslation;
        for (const part of parts) {
          currentObject = currentObject[part as keyof typeof currentObject];
        }
        if (params.interpolation) {
          return this.interpolate(
            currentObject,
            params.interpolation,
            params.escapeHTML,
          );
        }
        if (typeof params.escapeHTML === "boolean" && params.escapeHTML)
          return this.escapeHTMLTags(currentObject);
        return currentObject;
      }
    } catch (_) {
      throw new Error("i18n resource is not initialized");
    }
  }

  private interpolate(string: string, values: ILooseObject, escapeHTML = true) {
    return string.replace(/\[(.*?)\]/g, (match, key) => {
      const value = values[key.trim()] || match;
      return escapeHTML ? this.escapeHTMLTags(value) : value;
    });
  }

  private escapeHTMLTags(string: string) {
    return string.replace(/[&<>"'`=/]/g, (match) => {
      const escapeMap: Record<string, string> = {
        // eslint-disable-next-line quotes
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "/": "&#47;",
        "<": "&lt;",
        "=": "&#61;",
        ">": "&gt;",
        "`": "&#96;",
      };
      return escapeMap[match];
    });
  }
}
