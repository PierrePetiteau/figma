type V = { x: number; y: number };

const add = (v1: V, v2: V) => ({ x: v1.x + v2.x, y: v1.y + v2.y });
const move = (v: V) => `M ${v.x} ${v.y} `;
const line = (v: V) => `L ${v.x} ${v.y} `;

export const toSvgPath = (origin: V, vectorPath: V[]) => {
  let position: V = origin;
  let svg = move(origin);

  vectorPath.forEach((v) => {
    position = add(position, v);
    svg += line(position);
  });

  return svg + "Z";
};

export const Vector = (options: Partial<VectorNode> = {}) => {
  const { width, height, ...innerOptions } = options;
  const Vector = figma.createVector();
  for (const [key, value] of Object.entries(innerOptions)) {
    Vector[key] = value;
  }
  if (width !== undefined && height !== undefined) {
    Vector.resize(width, height);
  }
  return Vector;
};
