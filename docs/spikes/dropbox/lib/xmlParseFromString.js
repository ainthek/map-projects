// https://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross/20294226 
// TODO: extract error messages

export {xmlParseFromString};

function xmlParseFromString(src) {
  /* returns an XMLDocument, or throws if `src` is malformed */
  let key = `a` + Math.random().toString(32);
  let parser = new DOMParser;
  let doc = null;
  try {
    doc = parser.parseFromString(
      src + `<?${key}?>`, `application/xml`);
  } catch (_) {}

  if (!(doc instanceof XMLDocument)) {
    throw new Error("Failed to parse xml");
  }

  let lastNode = doc.lastChild;
  if (!(lastNode instanceof ProcessingInstruction) ||
    lastNode.target !== key ||
    lastNode.data !== ``) {
    throw new Error("Failed to parse xml");
  }

  doc.removeChild(lastNode);

  let errElemCount =
    doc.documentElement.getElementsByTagName(`parsererror`).length;
  if (errElemCount !== 0) {
    let errDoc = null;
    try {
      errDoc = parser.parseFromString(
        src + `<?`, `application/xml`);
    } catch (_) {}

    if (!(errDoc instanceof XMLDocument) ||
      errDoc.documentElement.getElementsByTagName(`parsererror`).length === errElemCount) {
      throw new Error("Failed to parse xml");
    }
  }
  return doc;
}