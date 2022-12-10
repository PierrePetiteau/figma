export const Line = (options: Partial<LineNode> = {}) => {
  const { width, height, ...innerOptions } = options;
  const Line = figma.createLine();
  for (const [key, value] of Object.entries(innerOptions)) {
    Line[key] = value;
  }
  if (width !== undefined && height !== undefined) {
    Line.resize(width, height);
  }
  return Line;
};
