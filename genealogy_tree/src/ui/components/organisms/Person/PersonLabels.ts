import { VerticalAutoLayout } from "../../atoms/Frame";
import { PersonDates } from "./PersonDates";
import { PersonNames } from "./PersonNames";

export const PersonLabels = (person: Person) => {
  const container = VerticalAutoLayout({ itemSpacing: 10 });
  const names = PersonNames(person);
  const dates = PersonDates(person);

  container.appendChild(names);
  container.appendChild(dates);

  return container;
};
