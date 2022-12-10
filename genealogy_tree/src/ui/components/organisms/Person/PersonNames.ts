import { VerticalAutoLayout } from "../../atoms/Frame";
import { TextBody } from "../../atoms/Text";

export const PersonNames = (person: Person) => {
  const container = VerticalAutoLayout();
  const firstname = TextBody({ characters: person.firstname });
  const lastname = TextBody({ characters: person.lastname });

  container.appendChild(firstname);
  container.appendChild(lastname);

  return container;
};
