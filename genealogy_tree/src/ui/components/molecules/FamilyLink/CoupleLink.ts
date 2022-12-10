import { heartVector } from "../../../../assets/heart_vector";
import { colors } from "../../../../style/colors";
import { Vector } from "../../atoms/Vector";

export const PartnerToPartnerLink = (main: FrameNode, partner: FrameNode) => {
  const link = Vector({
    vectorNetwork: {
      regions: [],
      segments: [
        { start: 0, end: 1, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 1, end: 2, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
        { start: 2, end: 3, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } },
      ],
      vertices: [
        { x: 0, y: 72, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: 0, y: 0, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: 230, y: 0, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
        { x: 230, y: 72, strokeCap: "NONE", strokeJoin: "MITER", cornerRadius: 10, handleMirroring: "NONE" },
      ],
    },
    strokeWeight: 3,
    strokes: [{ type: "SOLID", color: colors.gray85 }],
    strokeAlign: "CENTER",
    strokeCap: "NONE",
    strokeJoin: "MITER",
    x: main.x + main.width * 0.5,
    y: main.y - 72,
  });
  Vector({
    ...heartVector,
    x: main.x + main.width + 10 - 30,
    y: main.y - 72 - 25.86,
  });
  return link;
};
