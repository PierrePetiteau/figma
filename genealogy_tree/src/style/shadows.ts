import { colors } from "./colors";

const baseShadow: DropShadowEffect = {
  type: "DROP_SHADOW",
  color: colors.shadow,
  offset: { x: 0, y: 1 },
  radius: 4,
  spread: 0,
  visible: true,
  blendMode: "NORMAL",
};

type Shadow = (offset?: { x: number; y: number }) => DropShadowEffect;

export const shadowEffect: Shadow = (offset = { x: 0, y: 1 }) => ({
  ...baseShadow,
  offset,
});
