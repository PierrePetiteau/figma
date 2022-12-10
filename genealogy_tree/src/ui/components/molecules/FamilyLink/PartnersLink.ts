import { heartVector } from "../../../../assets/heart_vector";
import { colors } from "../../../../style/colors";
import { Line } from "../../atoms/Line";
import { Vector } from "../../atoms/Vector";

const FirstToLastLink = (first: FrameNode, last: FrameNode) => {
  const width = last.x - first.x;
  const link = Vector({
    vectorNetwork: {
      regions: [],
      segments: [
        { start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 1, end: 2, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 2, end: 3, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
      ],
      vertices: [
        { x: 0, y: 72, strokeCap: "ROUND", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: 0, y: 0, strokeCap: "ROUND", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: width, y: 0, strokeCap: "ROUND", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: width, y: 72, strokeCap: "ROUND", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
      ],
    },
    strokeWeight: 3,
    strokes: [{ type: "SOLID", color: colors.gray85 }],
    strokeAlign: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    x: first.x + first.width / 2,
    y: first.y - 72,
  });
  Vector({
    ...heartVector,
    x: last.x + last.width / 2 - 30,
    y: last.y - 72 - 25.86,
  });
  return link;
};

const CenterLink = (child: FrameNode) => {
  const link = Vector({
    vectorNetwork: {
      regions: [],
      segments: [{ start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } }],
      vertices: [
        { x: 0, y: 72, strokeCap: "ROUND", strokeJoin: "MITER", handleMirroring: "NONE" },
        { x: 0, y: 0, strokeCap: "ROUND", strokeJoin: "MITER", handleMirroring: "NONE" },
      ],
    },
    strokeWeight: 3,
    strokes: [{ type: "SOLID", color: colors.gray85 }],
    strokeAlign: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    x: child.x + child.width / 2,
    y: child.y - 72,
  });
  Vector({
    ...heartVector,
    x: child.x + child.width / 2 - 30,
    y: child.y - 72 - 25.86,
  });
  return link;
};

export const buildPartnersLinks = (nodes: FrameNode[]) => {
  const innerNodes = [...nodes];
  if (nodes.length > 1) {
    const first = innerNodes.shift();
    const last = innerNodes.pop();
    const link = FirstToLastLink(first, last);
    figma.currentPage.insertChild(0, link);
  }

  innerNodes.forEach((child) => {
    const link = CenterLink(child);
    figma.currentPage.insertChild(0, link);
  });
};
