# JupriLab i18n-core

**Speak to the world** with your JavaScript applications in a breeze! This lightweight i18n package offers a simple and dependency-free solution for internationalizing your projects. Type safety ensures robust translations and prevents runtime errors. No complex configurations, just intuitive code and seamless integration to get your app speaking multiple languages.

## Installation

Getting started is as easy as adding a single line to your project:

```bash
$ npm install @jupri-lab/i18n-core
```

**No external dependencies** means less bloat and a smaller footprint for your application.

## Usage

Here's a quick introduction to using the package:

**1. Create a file to instantiate `i18n` along with its configuration**

Define the languages your application supports and provide the corresponding translation resources:

```ts
import i18n from "@jupri-lab/i18n-core";

const i18nInstance = new i18n({
  languages: ["en", "nl"],
  resources: {
    en: {
      morning: "Good morning",
      bio: {
        sayName: "My name is Jupri",
      },
    },
    nl: {
      morning: "Goeden morgen",
      bio: {
        sayName: "Ik ben Jupri",
      },
    },
  },
});
```

**2. Translate your text**

Use the `translate` function to get the translated text for a specific identifier and language:

```ts
const morning = document.querySelector("#morning");
const sayName = document.querySelector("#sayName");
morning.innerHTML = i18nInstance.translate("morning");
sayname.innerHTML = i18nInstance.translate("bio.sayName");
```

**3. Change language**

You can dynamically change the language by providing a new language code to the getChangeLanguageHandler method:

```ts
const changeLanguageEN = document
  .querySelector("#en-btn")
  .addEventListener("click", () => i18nInstance.getChangeLanguageHandler("en"));
const changeLanguageNL = document
  .querySelector("#nl-btn")
  .addEventListener("click", () => i18nInstance.getChangeLanguageHandler("nl"));

i18nInstance.on("language_changed", () => {
  const morning = document.querySelector("#morning");
  const sayName = document.querySelector("#sayName");
  morning.innerHTML = i18nInstance.translate("morning");
  sayname.innerHTML = i18nInstance.translate("bio.sayName");
});
```

## Interpolation

The interpolation function allows you to replace placeholders within a string template with corresponding values from a provided object. It supports escaping HTML characters to prevent XSS (Cross-Site Scripting) attacks.

### Usage

```ts
const myi18n = new I18n({
  languages: ["en", "nl"],
  resources: {
    en: {
      greeting: "Hello, my name is [name]",
      portfolio: "My GitHub [github] and my LinkedIn [linkedin]",
    },
    nl: {
      greeting: "Hij, ik ben [name]",
      portfolio: "Mijn GitHub [github] en mijn LinkedIn [linkedin]",
    },
  },
});
```

```ts
myi18n.translate("greeting", { interpolation: { name: "Esa" } });
myi18n.translate("portfolio", {
  interpolation: {
    github: "https://github.com/JupriLab",
    linkedin: "https://www.linkedin.com/in/mikhael-esa/",
  },
});

// Output:
// - Hello, my name is Esa.
// - Hij, ik ben Esa.

// Output:
// - My GitHub https://github.com/JupriLab and my LinkedIn https://www.linkedin.com/in/mikhael-esa/
// - Mijn GitHub https://github.com/JupriLab en mijn LinkedIn https://www.linkedin.com/in/mikhael-esa/
```

> When writing interpolation, they identifier inside the resource and the translate function has to be the same.

## Benefits:

- **Simple and intuitive API**
- **Lightweight and dependency-free**
- **Easy integration**
- **Flexible for various use cases**
- **Type safety for robust translations**

**Go forth and conquer the world with your multilingual applications!**
