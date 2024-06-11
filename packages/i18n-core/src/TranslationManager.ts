import { escapeHTMLTags } from "./utils/escapeHTMLTags.util";
import { interpolate } from "./utils/interpolate.util";

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
          return interpolate(
            currentObject,
            params.interpolation,
            params.escapeHTML,
          );
        }
        if (typeof params.escapeHTML === "boolean" && params.escapeHTML)
          return escapeHTMLTags(currentObject);
        return currentObject;
      }
    } catch (_) {
      throw new Error("i18n resource is not initialized");
    }
  }
}
