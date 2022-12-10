import { debug } from "./blocs/debug/debug";
import { cleanTree } from "./blocs/FamilyTree/FamilyTreeCleaner";
import { renderTree } from "./blocs/FamilyTree/FamilyTreeGenerator";

figma.showUI(__html__, { themeColors: true, height: 300 });

figma.ui.onmessage = async (msg) => {
  await figma.loadFontAsync({ family: "Athiti", style: "SemiBold" });
  await figma.loadFontAsync({ family: "Athiti", style: "Medium" });

  switch (msg.type) {
    case "generate-family-tree": {
      cleanTree();
      renderTree();
      break;
    }
    case "clean-family-tree": {
      cleanTree();
      break;
    }
    case "debug": {
      debug();
    }
  }

  figma.closePlugin();
};
