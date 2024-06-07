# v1.0.0

- Created i18n class as an entry point for translation
  - Added change language feature with `getChangeLanguageHandler`
  - Added translate feature with `translate`
  - Added get current language feature with `getCurrentLanguage`
  - Added event listener to subscribe and get notified when language is changed with `on("language_changed")`
- Created `EventManager` class to manage event sub and pub
- Created documentation in README.md
