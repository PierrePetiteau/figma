import { FamilyRoot } from "../../data/FamilyRoot";
import { HorizontalAutoLayout } from "../../ui/components/atoms/Frame";
import { buildChildsLinks } from "../../ui/components/molecules/FamilyLink/ChildsLink";
import { ChildsToParentLink } from "../../ui/components/molecules/FamilyLink/ChildsToParentLink";
import { PartnerToPartnerLink } from "../../ui/components/molecules/FamilyLink/CoupleLink";
import { buildPartnersLinks } from "../../ui/components/molecules/FamilyLink/PartnersLink";
import {
  childsLinkCollection,
  childsToParentLinkCollection,
  coupleLinkCollection,
  partnersLinkCollection,
  personCollection,
  RecursiveFamily,
} from "../../ui/components/organisms/Family/Family";
import { cleanTree } from "./FamilyTreeCleaner";

export type RecursivePayload = {
  parentFrame: FrameNode;
  node: Family;
  generation: number;
  isFirstChild?: boolean;
  isLastChild?: boolean;
  firstChild?: FrameNode;
  lastChild?: FrameNode;
};

export const renderTree = () => {
  const rootFrame = HorizontalAutoLayout({ counterAxisAlignItems: "MAX", name: "root" });
  RecursiveFamily({ parentFrame: rootFrame, node: FamilyRoot, generation: 0 });

  personCollection.forEach((node, key) => {
    const absolutePosition = { x: node.absoluteTransform[0][2], y: node.absoluteTransform[1][2] };
    const clone = node.clone();

    figma.currentPage.appendChild(clone);
    clone.x = absolutePosition.x;
    clone.y = absolutePosition.y;
    personCollection.set(key, clone);
  });

  coupleLinkCollection.forEach(({ mainNodeId, partnerNodeId }) => {
    const mainClone = personCollection.get(mainNodeId);
    const partnerClone = personCollection.get(partnerNodeId);

    const link = PartnerToPartnerLink(mainClone, partnerClone);
    figma.currentPage.insertChild(0, link);
  });

  childsLinkCollection.forEach((links) => {
    if (links.length) {
      const childs = links.map((id) => personCollection.get(id));
      buildChildsLinks(childs);
    }
  });

  childsToParentLinkCollection.forEach((item) => {
    if (item.childs.length) {
      const main = personCollection.get(item.parents.main);
      const partner = personCollection.get(item.parents.partner);
      const childs = item.childs.map((id) => personCollection.get(id));

      const link = ChildsToParentLink(childs, { main, partner }, item.hasMultiplePartners);
      figma.currentPage.insertChild(0, link);
    }
  });

  partnersLinkCollection.forEach((links) => {
    if (links.length) {
      const nodes = links.map((id) => personCollection.get(id));
      buildPartnersLinks(nodes);
    }
  });

  cleanTree();
};
