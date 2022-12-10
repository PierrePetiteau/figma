import { findNodeByName } from "../../../helpers/finders";
import { AvatarContainer } from "./AvatarContainer";
import { AvatarPlaceholder, PlaceholderType } from "./AvatarPlaceholder";

type Props = { name?: string; type: PlaceholderType };

export const Avatar = ({ name, type }: Props) => {
  const container = AvatarContainer();

  try {
    const avatar = findNodeByName(name) as VectorNode;
    const cloneAvatar = avatar.clone() as VectorNode;
    cloneAvatar.resize(200, 250);
    container.appendChild(cloneAvatar);
    cloneAvatar.x = 0;
    cloneAvatar.y = -50;
    return container;
  } catch (error) {
  }

  const placeholder = AvatarPlaceholder(type);
  container.appendChild(placeholder);
  return container;
};
