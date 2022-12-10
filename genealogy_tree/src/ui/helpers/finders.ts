export const findNodeByName = (name: string) => {
  return figma.currentPage.findOne((node) => node.name === name);
};
