let pasteBoard = [];
function cloneWithShift(node) {
    let clone = node.clone();
    clone.relativeTransform = [
        [1, 0, node.relativeTransform[0][2] + node.width * 0.1],
        [0, 1, node.relativeTransform[1][2] + node.height * 0.1],
    ];
    if (node.parent.type === "GROUP") {
        const canAppendChild = figma.currentPage.findAll((v) => v.id === node.parent.id).length;
        canAppendChild && node.parent.appendChild(clone);
    }
    return clone;
}
function duplicate() {
    let cloneList = [];
    figma.currentPage.selection.map((child) => {
        cloneList.push(cloneWithShift(child));
    });
    figma.currentPage.selection = cloneList;
    figma.commitUndo();
}
function copy() {
    pasteBoard = [];
    figma.currentPage.selection.map((child) => {
        pasteBoard.push(child);
    });
    figma.notify("Copy selection");
}
function paste() {
    figma.currentPage.selection = pasteBoard.map(cloneWithShift);
    figma.commitUndo();
}
function remove() {
    figma.currentPage.selection.map((v) => v.remove());
    figma.commitUndo();
}
function undo() {
    figma.triggerUndo();
}
function runPlugin() {
    figma.showUI(__html__, {
        themeColors: true,
        visible: true,
        width: 40,
        height: 350,
    });
    figma.ui.reposition(figma.viewport.bounds.x, figma.viewport.bounds.y);
    figma.ui.onmessage = (msg) => {
        const command = msg.type;
        switch (command) {
            case "duplicate": {
                duplicate();
                break;
            }
            case "copy": {
                copy();
                break;
            }
            case "paste": {
                paste();
                break;
            }
            case "remove": {
                remove();
                break;
            }
            case "undo": {
                undo();
                break;
            }
        }
    };
}
runPlugin();
