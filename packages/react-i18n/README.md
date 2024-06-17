# JupriLab React i18n

**react-i18n** is a flexible and powerful library designed to simplify internationalization in React applications. It leverages a core i18n library to provide a seamless experience for managing translations and switching between languages in your React app.

## Installation

To install react-i18n, you need to install React adapter:

```bash
$ npm install @jupri-lab/react-i18n
```

## Usage

### Adding the Provider

To use react-i18n, you need to wrap your application with the I18nProvider component. This component will provide the i18n instance to the rest of your application.

### Adding Configs to Provider

Create your i18n configuration object and pass it to the I18nProvider.

```tsx
import React from "react";
import I18nProvider from "@jupri-lab/react-i18n";
import type { Ii18nConfigs } from "@jupri-lab/i18n-core";

type Languages = "en" | "es";
type Resources = {
  greeting: string;
};

const i18nConfigs: Ii18nConfigs<Languages, Resources> = {
  languages: ["en", "es"],
  resources: {
    en: { greeting: "Hello" },
    es: { greeting: "Hola" },
  },
  enableQueryParams: true, // Enable persisting language via query params
  queryParam: "lang", // Default is 'lang', you can customize it
};

const App: React.FC = () => (
  <I18nProvider configs={i18nConfigs}>{/* Your app components */}</I18nProvider>
);

export default App;
```

### Using useI18n and TypeScript Usage

The **useI18n** hook provides access to translation functions and language management utilities. Here's an example of how to use it in a component:

```tsx
import React from "react";
import { useI18n } from "@jupri-lab/react-i18n";

const Greeting: React.FC = () => {
  const { translate } = useI18n<Languages>();

  return <p>{translate("greeting")}</p>;
};

export default Greeting;
```

### Changing Language Using getChangeLanguageHandler

You can change the current language using the **getChangeLanguageHandler** function provided by the **useI18n** hook.

```tsx
import React from "react";
import { useI18n } from "@jupri-lab/react-i18n";

const LanguageSwitcher: React.FC = () => {
  const { getChangeLanguageHandler } = useI18n<Languages>();

  return (
    <div>
      <button onClick={() => getChangeLanguageHandler("en")}>English</button>
      <button onClick={() => getChangeLanguageHandler("es")}>Spanish</button>
    </div>
  );
};

export default LanguageSwitcher;
```

### Get Current Language Using getCurrentLanguage

To get the current language, you can use the getCurrentLanguage function provided by the useI18n hook.

```tsx
import React from "react";
import { useI18n } from "@jupri-lab/react-i18n";

const CurrentLanguage: React.FC = () => {
  const { getCurrentLanguage } = useI18n<Languages>();

  return <p>Current Language: {getCurrentLanguage()}</p>;
};

export default CurrentLanguage;
```

### Persisting Language via Query Parameters

By enabling the **enableQueryParams** option in the configuration, the selected language will be persisted via query parameters in the URL. This ensures that the language setting is maintained across page reloads and can be shared via URL.

To enable this feature, set **enableQueryParams** to true and optionally specify a custom **queryParam** name in your configuration.

```tsx
const i18nConfigs: Ii18nConfigs<Languages, Resources> = {
  languages: ["en", "es"],
  resources: {
    en: { greeting: "Hello" },
    es: { greeting: "Hola" },
  },
  enableQueryParams: true, // Enable persisting language via query params
  queryParam: "lang", // Default is 'lang', you can customize it
};
```

## Core Features

- **Flexible Configuration**: Easily configure supported languages and resources.
- **Type Safety**: Fully typed to leverage TypeScript for safety and autocomplete.
- **Translation Functions**: Use the translate function to get translated strings.
- **Language Switching**: Seamlessly switch between languages using getChangeLanguageHandler.
- **Current Language**: Access the current language with getCurrentLanguage.
- **HTML Escaping**: Built-in support for escaping HTML in translations.
- **Interpolation**: Support for string interpolation in translations.
