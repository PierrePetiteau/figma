import { RecursivePayload } from "../../../../blocs/FamilyTree/FamilyTreeGenerator";
import { HorizontalAutoLayout, VerticalAutoLayout } from "../../atoms/Frame";
import { Person } from "../Person/Person";

type ChildsToParentLink = {
  childs: string[];
  parents: { main: string; partner: string };
  hasMultiplePartners: boolean;
};

export const childsToParentLinkCollection: Map<String, ChildsToParentLink> = new Map();
export const coupleLinkCollection: { mainNodeId: string; partnerNodeId: string }[] = [];
export const partnersLinkCollection: Map<String, string[]> = new Map();
export const childsLinkCollection: Map<String, string[]> = new Map();
export const personCollection: Map<String, FrameNode> = new Map();

type buildFamilyResponse = {
  container: FrameNode | null;
  getChildsContainer?: (partnerIndex: number) => FrameNode;
};
type buildFamilyFn = (payload: RecursivePayload) => buildFamilyResponse;

const addParentsInChildsToParentLinkCollection = (
  key: string,
  payload: RecursivePayload,
  main: FrameNode,
  partner: FrameNode
) => {
  const link: ChildsToParentLink = {
    parents: { main: main.id, partner: partner.id },
    childs: [],
    hasMultiplePartners: payload.node.partners.length > 1,
  };
  childsToParentLinkCollection.set(key, link);
};

const addChildsInChildsToParentLinkCollection = (payload: RecursivePayload, person: FrameNode) => {
  const collection = childsToParentLinkCollection;
  const key = payload.parentFrame.id;

  const existingLink = collection.get(key);
  if (existingLink) {
    const childs = [...existingLink.childs, person.id];
    collection.set(key, { ...existingLink, childs });
  }
};

const addPersonToPartnersLinkCollection = (key: string, person: FrameNode) => {
  const existingLink = partnersLinkCollection.get(key) ?? [];
  partnersLinkCollection.set(key, [...existingLink, person.id]);
};

const processChildsLinkCollection = (payload: RecursivePayload, person: FrameNode) => {
  const existingLink = childsLinkCollection.get(payload.parentFrame.id) ?? [];
  childsLinkCollection.set(payload.parentFrame.id, [...existingLink, person.id]);
  addChildsInChildsToParentLinkCollection(payload, person);
};

const buildSingle: buildFamilyFn = (payload: RecursivePayload) => {
  const container = VerticalAutoLayout({ paddingLeft: 40, paddingRight: 40, paddingBottom: 288 });
  const single = Person(payload.node);
  personCollection.set(single.id, single);
  processChildsLinkCollection(payload, single);

  payload.parentFrame.appendChild(container);
  container.appendChild(single);

  return { container: null };
};

const buildCouple: buildFamilyFn = (payload: RecursivePayload) => {
  const container = VerticalAutoLayout({ paddingLeft: 40, paddingRight: 40 });
  const childsContainer = HorizontalAutoLayout({ counterAxisAlignItems: "MAX" });
  const coupleContainer = HorizontalAutoLayout({ itemSpacing: 20, paddingBottom: 288 });
  const main = Person(payload.node);
  const partner = Person(payload.node.partners[0]);
  personCollection.set(main.id, main);
  processChildsLinkCollection(payload, main);
  addParentsInChildsToParentLinkCollection(childsContainer.id, payload, main, partner);
  personCollection.set(partner.id, partner);
  coupleLinkCollection.push({ mainNodeId: main.id, partnerNodeId: partner.id });

  payload.parentFrame.appendChild(container);
  container.appendChild(childsContainer);
  container.appendChild(coupleContainer);
  coupleContainer.appendChild(main);
  coupleContainer.appendChild(partner);

  return { container, getChildsContainer: () => childsContainer };
};

const buildPartners: buildFamilyFn = (payload: RecursivePayload) => {
  const container = VerticalAutoLayout({ paddingLeft: 40, paddingRight: 40, paddingBottom: 288 });
  const partnersChildsContainer = HorizontalAutoLayout({ counterAxisAlignItems: "MAX" });
  const partnersContainer = HorizontalAutoLayout({
    itemSpacing: 20,
    paddingLeft: 40,
    paddingRight: 40,
    counterAxisAlignItems: "MAX",
  });
  const main = Person(payload.node);
  personCollection.set(main.id, main);
  processChildsLinkCollection(payload, main);
  addPersonToPartnersLinkCollection(main.id, main);
  payload.parentFrame.appendChild(container);
  container.appendChild(partnersChildsContainer);
  container.appendChild(partnersContainer);
  partnersContainer.appendChild(main);

  payload.node.partners.forEach((partnerData) => {
    const partner = Person(partnerData);
    personCollection.set(partner.id, partner);
    addPersonToPartnersLinkCollection(main.id, partner);
    partnersContainer.appendChild(partner);

    if (partnerData.childs?.length) {
      const childsContainer = HorizontalAutoLayout({ counterAxisAlignItems: "MAX", name: partner.id.toString() });
      addParentsInChildsToParentLinkCollection(childsContainer.id, payload, main, partner);
      partnersChildsContainer.appendChild(childsContainer);
    }
  });

  const getChildsContainer = (partnerIndex: number) => {
    const partnerNodeId = partnersContainer.children[partnerIndex + 1].id;
    const childsContainer = partnersChildsContainer.findOne((node) => node.name === partnerNodeId);
    return childsContainer as FrameNode;
  };
  return { container, getChildsContainer };
};

const buildFamily = (payload: RecursivePayload) => {
  const numberOfPartner = payload.node.partners?.length;
  if (!numberOfPartner) {
    return buildSingle(payload);
  } else if (numberOfPartner === 1) {
    return buildCouple(payload);
  } else if (numberOfPartner > 1) {
    return buildPartners(payload);
  }
};

export const RecursiveFamily = (payload: RecursivePayload) => {
  const { container, getChildsContainer } = buildFamily(payload);
  const partners = payload.node?.partners;

  try {
    if (partners) {
      partners.map((partner, partnerIndex) => {
        const childs = partner.childs;

        if (childs) {
          childs.map((child, childIndex) => {
            const childPayload: RecursivePayload = {
              ...payload,
              parentFrame: getChildsContainer?.(partnerIndex),
              node: child,
              generation: payload.generation + 1,
              isFirstChild: childIndex === 0,
              isLastChild: childIndex === childs.length - 1,
            };
            RecursiveFamily(childPayload);
          });
        }
      });
    }
  } catch (error) {
    console.log("------------------------------------", "error", error);
  }
  return container;
};
