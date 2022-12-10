import { VerticalAutoLayout } from "../../atoms/Frame";
import { TextBody } from "../../atoms/Text";

export const PersonDates = (person: Person) => {
  const container = VerticalAutoLayout();
  const birthdate = TextBody({
    characters: person.birthdate,
    fontName: { family: "Athiti", style: "Medium" },
    fontSize: 24,
  });
  container.appendChild(birthdate);

  if (person.deathdate) {
    const deathdate = TextBody({
      characters: person.deathdate,
      fontName: { family: "Athiti", style: "Medium" },
      fontSize: 24,
    });
    container.appendChild(deathdate);
  }
  return container;
};
