const neutral = {
  gray98: { r: 0.98, g: 0.98, b: 0.98 },
  gray85: { r: 0.85, g: 0.85, b: 0.85 },
  black: { r: 0, g: 0, b: 0 },
};

const alias = {
  shadow: { ...neutral.black, a: 0.25 },
};

export const colors = {
  ...neutral,
  ...alias,
};
