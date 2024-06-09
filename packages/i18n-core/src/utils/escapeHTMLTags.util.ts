export const escapeHTMLTags = (string: string): string => {
  return string.replace(/[&<>"'`=/]/g, (match) => {
    const escapeMap: Record<string, string> = {
      // eslint-disable-next-line quotes
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#39;",
      "/": "&#47;",
      "<": "&lt;",
      "=": "&#61;",
      ">": "&gt;",
      "`": "&#96;",
    };
    return escapeMap[match];
  });
};
