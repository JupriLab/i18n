/* eslint-disable quotes */
import { escapeHTMLTags } from "../src/utils/escapeHTMLTags.util";

describe("escapeHtml", () => {
  it("escapes < character", () => {
    const unsafe = "<div>";
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("&lt;div&gt;");
  });

  it("escapes > character", () => {
    const unsafe = "</div>";
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("&lt;&#47;div&gt;");
  });

  it('escapes " character', () => {
    const unsafe = 'The "quick" brown fox';
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("The &quot;quick&quot; brown fox");
  });

  it("escapes ' character", () => {
    const unsafe = "It's a beautiful day";
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("It&#39;s a beautiful day");
  });

  it("escapes ` character", () => {
    const unsafe = "Hello `world`";
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("Hello &#96;world&#96;");
  });

  it("escape & character", () => {
    const unsafe = "Tom & Jerry";
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe("Tom &amp; Jerry");
  });

  it("escapes multiple characters", () => {
    const unsafe = '<div class="test">It\'s `great` & cool</div>';
    const safe = escapeHTMLTags(unsafe);
    expect(safe).toBe(
      "&lt;div class&#61;&quot;test&quot;&gt;It&#39;s &#96;great&#96; &amp; cool&lt;&#47;div&gt;",
    );
  });
});
