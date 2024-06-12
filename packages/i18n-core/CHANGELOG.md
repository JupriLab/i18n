# v2.1.3

- Removed `escapeHTMLTags` and `interpolate` utils and move them to `TranslationManager` as private methods.
- Removed `appendQueryParams` util and move it to `LanguageManager` as private method
- Removed mocks in tests for simpler testing
- Removed test cases for `escapeHTMLTags` and `interpolate`

# v2.1.2

- Refactored codebase into single responsibility classes.
  - Created `TranslationManager`, and `LanguageManager`.
  - `i18n` is now more manageable.
- Added new type `TEvents` for type safety and better DX
- Created test cases for `LanguageManager`, and `TranslationManager`
- Removed `ILooseObject` from export
- Added `TEvents` to export

# v2.1.1

- Removed throw new Error when user is not in browser environment.
  - Will support node environment in future version as node also has URL object
- Wrote test cases for i18n.

# v2.1.0

- Removed localStorage to persist data by default and will add it as an optional feature that can be enabled by setting a flag.
- Store `currentLanguage` locally and only provide one option to persist `currentLanguage` which is through `queryParam` by setting `enableQueryparams` to true.
- Set tsconfig module to esnext.

# June 6th 2024

- Integrated jest for typescript and monorepo
- Wrote test cases with jest
  - `interpolation.spec.ts`
  - `escapesHTML.spec.ts`
  - `eventManager.spec.ts`
- Moved i18n class to `i18n.ts` and re-exports it through `index.ts`
- Exported types.

# v2.0.0

- Added interpolation feature
  - String wrapped with `[]` can be interpolated
  - Added escape HTML feature to prevent XSS. `true` by default
- Create move query params logic to `appendQueryParams` function in utils
- Fixed some typos in documentation.
- Bump package.json version to 2.0.0
- Update documentation for interpolation.

# v1.0.0

- Created i18n class as an entry point for translation
  - Added change language feature with `getChangeLanguageHandler`
  - Added translate feature with `translate`
  - Added get current language feature with `getCurrentLanguage`
  - Added event listener to subscribe and get notified when language is changed with `on("language_changed")`
- Created `EventManager` class to manage event sub and pub
- Created documentation in README.md
