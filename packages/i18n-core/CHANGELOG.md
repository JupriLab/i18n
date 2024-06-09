# June 6th 2024

- Integrated jest for typescript and monorepo
- Wrote test cases with jest
  - `interpolation.spec.ts`
  - `escapesHTML.spec.ts`
  - `eventManager.spec.ts`

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
