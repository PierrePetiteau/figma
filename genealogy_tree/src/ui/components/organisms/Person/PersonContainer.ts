import { colors } from "../../../../style/colors";
import { shadowEffect } from "../../../../style/shadows";
import { VerticalAutoLayout } from "../../atoms/Frame";

export const PersonContainer = () => {
  return VerticalAutoLayout({
    fills: [{ type: "SOLID", color: colors.gray98 }],
    cornerRadius: 210,
    effects: [shadowEffect()],
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    itemSpacing: 20,
    width: 210,
    height: 450,
  });
};
