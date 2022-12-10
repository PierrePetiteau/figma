import { assets } from "../../../../assets/assets";
import { Frame } from "../../atoms/Frame";

export type PlaceholderType = "child" | "man" | "woman";

export const AvatarPlaceholder = (type: PlaceholderType) => {
  const image = Frame({ y: -50, width: 200, height: 250 });

  switch (type) {
    case "child": {
      image.fills = [{ type: "IMAGE", imageHash: assets.placeholder_child.hash, scaleMode: "FILL" }];
      break;
    }
    case "man": {
      image.fills = [{ type: "IMAGE", imageHash: assets.placeholder_man.hash, scaleMode: "FILL" }];
      break;
    }
    case "woman": {
      image.fills = [{ type: "IMAGE", imageHash: assets.placeholder_women.hash, scaleMode: "FILL" }];
      break;
    }
  }
  return image;
};
