export const appendQueryParams = (key: string, value: string) => {
  const newURL = new URL(window.location.href);
  newURL.searchParams.set(key, value);
  window.history.replaceState({}, "", newURL.href);
};
