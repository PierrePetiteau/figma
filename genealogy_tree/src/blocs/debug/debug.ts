const debugVector = (node: VectorNode) => {
  console.log("---------", "vectorNetwork", JSON.stringify(node.vectorNetwork));
  console.log("---------", "vectorNetwork", JSON.stringify(node.vectorPaths));
  console.log("---------", "strokes", node.strokes);
  console.log("---------", "strokeWeight", node.strokeWeight);
  console.log("---------", "strokeAlign", node.strokeAlign);
  console.log("---------", "strokeCap", node.strokeCap);
  console.log("---------", "strokeJoin", node.strokeJoin);
  console.log("---------", "fills", node.fills);
  console.log("---------", "x", node.x);
  console.log("---------", "y", node.y);
};

export const debug = () => {
  figma.currentPage.children.forEach((node) => {
    console.log("---------", "node.type", node?.type);

    switch (node.type) {
      case "VECTOR": {
        debugVector(node);
      }
    }
  });
};
