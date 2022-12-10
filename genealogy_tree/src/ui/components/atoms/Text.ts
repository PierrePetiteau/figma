export const Text = (options: Partial<TextNode> = {}) => {
  const node = figma.createText();
  for (const [key, value] of Object.entries(options)) {
    node[key] = value;
  }
  return node;
};

export const TextBody = (options: Partial<TextNode> = {}) => {
  return Text({
    fontName: { family: "Athiti", style: "SemiBold" },
    fontSize: 32,
    fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }],
    ...options,
  });
};
