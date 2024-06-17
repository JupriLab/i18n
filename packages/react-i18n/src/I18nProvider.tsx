import type { ITranslateOptions } from "@jupri-lab/i18n-core";
import i18n from "@jupri-lab/i18n-core";
import type { Context } from "react";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { Ii18nContext, Ii18nProviderProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const I18nContext = createContext<Ii18nContext<string> | undefined>(undefined);

const I18nProvider = <TLanguage extends string, TResources extends object>({
  children,
  configs,
}: Ii18nProviderProps<TLanguage, TResources>) => {
  const i18nInstance = useRef(new i18n<TLanguage, TResources>(configs));
  const [currentLanguage, setCurrentLanguage] = useState(
    i18nInstance.current.getCurrentLanguage(),
  );

  const getChangeLanguageHandler = useCallback(
    (language: TLanguage | string) => {
      i18nInstance.current.getChangeLanguageHandler(language as TLanguage);
      setCurrentLanguage(i18nInstance.current.getCurrentLanguage());
    },
    [],
  );

  const translate = useCallback(
    (identifier: string, data?: ITranslateOptions): string => {
      return i18nInstance.current.translate(identifier, data);
    },
    [],
  );

  const getCurrentLanguage = (): TLanguage | string => {
    return currentLanguage;
  };
  return (
    <I18nContext.Provider
      value={{
        getChangeLanguageHandler,
        getCurrentLanguage,
        translate,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = <TLanguage extends string>() => {
  const ctx = useContext(
    I18nContext as Context<Ii18nContext<TLanguage> | undefined>,
  );
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");

  return ctx;
};

export default I18nProvider;
