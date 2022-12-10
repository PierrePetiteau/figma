import { RecursivePayload } from "../../../../blocs/FamilyTree/FamilyTreeGenerator";
import { HorizontalAutoLayout, VerticalAutoLayout } from "../../atoms/Frame";
import { Person } from "../Person/Person";



// export const Parteners = (payload: RecursivePayload) => {
//   const container = HorizontalAutoLayout({ itemSpacing: 20 });

//   const couple = [wrapMainWithLinks(Person(payload.node.main), payload)];

//   if (payload.node.partner) {
//     if (payload.node.partner.gender === "M") {
//       couple.unshift(Person(payload.node.partner));
//     } else {
//       couple.push(Person(payload.node.partner));
//     }
//   }
//   for (const person of couple) {
//     container.appendChild(person);
//   }

//   return container;
// };
