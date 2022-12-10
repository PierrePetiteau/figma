export const cleanTree = () => {
  const tree = figma.currentPage.findOne((node) => node.name === "root");

  if (tree) {
    tree.remove();
  }
};
