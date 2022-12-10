export const Rectangle = (options: Partial<RectangleNode> = {}) => {
  const { width, height, ...innerOptions } = options;
  const Rectangle = figma.createRectangle();
  for (const [key, value] of Object.entries(innerOptions)) {
    Rectangle[key] = value;
  }
  if (width !== undefined && height !== undefined) {
    Rectangle.resize(width, height);
  }
  return Rectangle;
};
