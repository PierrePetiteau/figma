import { Frame } from "../../atoms/Frame";

export const AvatarContainer = () => {
  const container = Frame({
    fills: [],
    cornerRadius: 100,
    clipsContent: false,
    width: 200,
    height: 200,
  });
  return container;
};
