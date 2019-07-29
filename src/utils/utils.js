export function removeNode(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}