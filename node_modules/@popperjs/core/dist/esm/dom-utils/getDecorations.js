import getBorders from "./getBorders.js";
import getNodeName from "./getNodeName.js";
import getWindow from "./getWindow.js"; // Borders + scrollbars

export default function getDecorations(element) {
  var win = getWindow(element);
  var borders = getBorders(element);
  var isHTML = getNodeName(element) === 'html';
  var x = element.clientWidth + borders.right;
  var y = element.clientHeight + borders.bottom;
  return {
    top: element.clientTop,
    right: // RTL scrollbar
    element.clientLeft > borders.left ? borders.right : // LTR scrollbar
    isHTML ? win.innerWidth - x : element.offsetWidth - x,
    bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
    left: element.clientLeft
  };
}