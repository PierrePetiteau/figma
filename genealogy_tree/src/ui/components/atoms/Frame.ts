export const Frame = (options: Partial<FrameNode> = {}) => {
  const { width, height, ...innerOptions } = options;
  const frame = figma.createFrame();
  for (const [key, value] of Object.entries(innerOptions)) {
    frame[key] = value;
  }
  if (width !== undefined && height !== undefined) {
    frame.resize(width, height);
  }
  return frame;
};

export const HorizontalAutoLayout = (options: Partial<FrameNode> = {}) => {
  return Frame({
    layoutMode: "HORIZONTAL",
    primaryAxisSizingMode: "AUTO",
    counterAxisSizingMode: "AUTO",
    fills: [],
    clipsContent: false,
    ...options,
  });
};

export const VerticalAutoLayout = (options: Partial<FrameNode> = {}) => {
  return Frame({
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "CENTER",
    primaryAxisSizingMode: "AUTO",
    counterAxisSizingMode: "AUTO",
    fills: [],
    clipsContent: false,
    ...options,
  });
};
