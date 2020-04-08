export { readFileAsString, readFileAsDom, readFileAsJs, str2dom, str2js };

// for browser this is resolved as window.* for node it is polyfilled
import { DOMParser, Document, ProcessingInstruction } from "./DomParser.js"


// TODO: full streaming support where possible, 
// but it seems impossible form xml2js and
// for DOMParser myst investigate 
// also try to eliminate duplicate xml parsing, one with js2xml and one with DOMparser
// try to combine to do XML parsing only once

function readFileAsString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const { result, error } = this;
      if (error) return reject(error);
      return resolve(result);
    }
    reader.readAsText(file);
  });
}

function readFileAsDom(file) {
  return readFileAsString().then(str2xml);
}

function readFileAsJs(file) {
  return readFileAsString().then(str2js);
}

function str2dom(src) {
  // https://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross/20294226 
  // TODO: extract error messages	
  /* returns an XMLDocument, or throws if `src` is malformed */
  let key = `a` + Math.random().toString(32);
  let parser = new DOMParser;
  let doc = null;
  debugger;
  try {
    doc = parser.parseFromString(
      src + `<?${key}?>`, `application/xml`);
  } catch (_) { }
 
  if (!(doc instanceof Document)) {
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
    } catch (_) { }

    if (!(errDoc instanceof Document) ||
      errDoc.documentElement.getElementsByTagName(`parsererror`).length === errElemCount) {
      throw new Error("Failed to parse xml");
    }
  }
  return doc;
}

function str2js(strXml) {
  return new xml2js.Parser().parseStringPromise(strXml)
}