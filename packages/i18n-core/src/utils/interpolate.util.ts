import type { ILooseObject } from "../types";
import { escapeHTMLTags } from "./escapeHTMLTags.util";

export const interpolate = (
  string: string,
  values: ILooseObject,
  escapeHTML = true,
) => {
  return string.replace(/\[(.*?)\]/g, (match, key) => {
    const value = values[key.trim()] || match;
    return escapeHTML ? escapeHTMLTags(value) : value;
  });
};
