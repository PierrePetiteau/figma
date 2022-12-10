import { colors } from "../../../../style/colors";
import { Line } from "../../atoms/Line";
import { Rectangle } from "../../atoms/Rectangle";
import { Vector } from "../../atoms/Vector";

type V = { x: number; y: number };

const lineToConnector = (start: V, end: V, midY: number) => {
  const width = start.x - end.x;
  const height = start.y - end.y;

  const verticeBase: VectorVertex = { x: 0, y: 0, cornerRadius: 10 };
  const vertices: VectorVertex[] = [
    { ...verticeBase, x: 0, y: height },
    { ...verticeBase, x: 0, y: height - midY },
    { ...verticeBase, x: -width, y: height - midY },
    { ...verticeBase, x: -width, y: 0 },
  ];
  return vertices;
};

const VerticalConnector = (start: V, end: V, midY) => {
  const vertices = lineToConnector(start, end, midY);
  const link = Vector({
    vectorNetwork: {
      regions: [],
      segments: [
        { start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 1, end: 2, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 2, end: 3, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
      ],
      vertices,
    },
    strokeWeight: 3,
    strokes: [{ type: "SOLID", color: colors.gray85 }],
    strokeAlign: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    x: Math.min(start.x, end.x),
    y: end.y,
  });
  return link;
};

export const ChildsToCoupleLink = (start: V, end: V) => {
  const height = start.y - end.y;
  const link = Vector({
    vectorNetwork: {
      regions: [],
      segments: [{ start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } }],
      vertices: [
        { x: 0, y: height, strokeCap: "ROUND", strokeJoin: "MITER", handleMirroring: "NONE" },
        { x: 0, y: 0, strokeCap: "ROUND", strokeJoin: "MITER", handleMirroring: "NONE" },
      ],
    },
    strokeWeight: 3,
    strokes: [{ type: "SOLID", color: colors.gray85 }],
    strokeAlign: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    x: start.x,
    y: end.y,
  });
  return link;
};

const singleChildLinkPosition = (node: FrameNode) => ({
  x: node.x + node.width / 2,
  y: node.y + node.height + 72,
});
const multiplesChildLinkPosition = (first: FrameNode, last: FrameNode) => ({
  x: first.x + first.width / 2 + (last.x - first.x) / 2,
  y: first.y + first.height + 72,
});
const singlePartnerLinkPosition = (main: FrameNode, partner: FrameNode) => ({
  x: main.x + main.width / 2 + (partner.x - main.x) / 2,
  y: main.y - 72,
});
const multiplesPartnerLinkPosition = (partner: FrameNode) => ({
  x: partner.x + partner.width / 2,
  y: partner.y,
});

const computeConnectorStartPosition = (main: FrameNode, partner: FrameNode, hasMultiplePartners: boolean) => {
  if (hasMultiplePartners) {
    return multiplesPartnerLinkPosition(partner);
  }
  return singlePartnerLinkPosition(main, partner);
};
const computeConnectorEndPosition = (childs: FrameNode[]) => {
  if (childs.length === 1) {
    return singleChildLinkPosition(childs[0]);
  }
  return multiplesChildLinkPosition(childs[0], childs[childs.length - 1]);
};

export const ChildsToParentLink = (
  childs: FrameNode[],
  parents: { main: FrameNode; partner: FrameNode },
  hasMultiplePartners: boolean
) => {
  const { main, partner } = parents;

  const start = computeConnectorStartPosition(main, partner, hasMultiplePartners);
  const end = computeConnectorEndPosition(childs);

  if (childs.length > 1 && !hasMultiplePartners) {
    return ChildsToCoupleLink(start, end);
  } else {
    return VerticalConnector(start, end, hasMultiplePartners ? 147 : 75);
  }
};
