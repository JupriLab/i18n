import { interpolate } from "../src/utils/interpolate.util";

describe("interpolation", () => {
  it("Replaces placeholder with corresponding values", () => {
    const template = "Hello, [name]! You have [count] new messages";
    const variables = { count: "2", name: "James" };
    const result = interpolate(template, variables);

    expect(result).toBe("Hello, James! You have 2 new messages");
  });

  it("Leaves placeholder unchanged if variables is not provided", () => {
    const template = "Hello, [name]! You have [count] new messages";
    const variables = { name: "James" };
    const result = interpolate(template, variables);

    expect(result).toBe("Hello, James! You have [count] new messages");
  });

  it("Escapes HTML character", () => {
    const template = "Your comment: [comment]";
    const variables = { comment: "<script>alert('XSS');</script>" };
    const result = interpolate(template, variables);

    expect(result).toBe(
      "Your comment: &lt;script&gt;alert(&#39;XSS&#39;);&lt;&#47;script&gt;",
    );
  });
});
