import { Avatar } from "../../molecules/Avatar/Avatar";
import { PlaceholderType } from "../../molecules/Avatar/AvatarPlaceholder";
import { PersonContainer } from "./PersonContainer";
import { PersonLabels } from "./PersonLabels";

const getPersonType: (person: Person) => PlaceholderType = (person) => {
  if (person.isChild) {
    return "child";
  } else if (person.gender === "F") {
    return "woman";
  }
  return "man";
};

export const Person = (person: Person) => {
  const container = PersonContainer();
  const avatar = Avatar({ name: person.avatar, type: getPersonType(person) });
  const labels = PersonLabels(person);

  container.appendChild(avatar);
  container.appendChild(labels);

  return container;
};
