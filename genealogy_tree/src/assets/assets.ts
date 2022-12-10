import { placeholder_child } from "./placeholder_child";
import { placeholder_man } from "./placeholder_man";
import { placeholder_women } from "./placeholder_women";

export const assets = {
  placeholder_man: figma.createImage(figma.base64Decode(placeholder_man)),
  placeholder_women: figma.createImage(figma.base64Decode(placeholder_women)),
  placeholder_child: figma.createImage(figma.base64Decode(placeholder_child)),
};
