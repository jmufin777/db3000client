function hasClas(element, cls) {
  return element.className.split(' ').indexOf(cls) > -1
}
export function hasClass(element, cls) {
  return hasClas(element, cls)
}
