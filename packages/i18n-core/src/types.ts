export interface Ii18nConfigs<
  TLanguage extends string,
  TResources extends object,
> {
  /**
   * Flag to enable adding query params for current language
   */
  enableQueryParams?: boolean;
  /**
   * An array of languages that wants to be supported
   */
  languages: TLanguage[];
  /**
   * To read current language through query param
   */
  queryParam?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources: Record<TLanguage, TResources> | undefined;
}

export type TNestedKeyOf<T extends object> = {
  [Key in keyof T]: T[Key] extends object ? TNestedKeyOf<T[Key]> : Key;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ILooseObject = Record<string, any>;

export interface IEventListener<T extends any[]> {
  (...args: T): void;
}

export interface ITranslateOptions extends ILooseObject {
  escapeHTML?: boolean;
  /**
   * To add interpolation to you translation.
   *
   * @example
   * en: {
   *  greeting: "Good [time]"
   * }
   *
   * translate("greeting", { interpolation: { time: "Morning" } }) // Good Morning
   */
  interpolation?: ILooseObject;
}
