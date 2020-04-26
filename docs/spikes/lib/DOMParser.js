//Motivation:
//We want browser modules to stop using globals
// so instead of writing new DOMParser
// one must write import DOMParser from "./DOMParser.js" and then new DOMParser

// REVIEW: not sure this is OK, considering asyn nature, 
// nefunguje v browseroch import from "global" ? 
// ako sa v brwsroch v ES6 moduloch maju pouzivat build-in ?
// snad nie stale ako glovalky bez importu ? nic som k tomu nenasiel

// zatial som to polepil takto zda sa ze take moduly idu aj v browsri aj v node
// see also: https://www.npmjs.com/package/node-window-polyfill


//IT IS NOT OK !!!! it works only by accident.
// Exported DOMParser is null, when called imediatelly after import

export let DOMParser, XMLDocument, Document, ProcessingInstruction,XMLSerializer;

if (globalThis.DOMParser === undefined) {
    import("jsdom").then(module => {
        const { JSDOM } = module.default;

        const jsDomInstance = new JSDOM().window;
        ({ DOMParser, XMLDocument, Document, ProcessingInstruction, XMLSerializer } = jsDomInstance);
        // XMLDocument = jsDomInstance.XMLDocument;
        // Document = jsDomInstance.Document;
        // ProcessingInstruction = jsDomInstance.ProcessingInstruction;
    })
}
else {
    ({ DOMParser, XMLDocument, Document, ProcessingInstruction,XMLSerializer } = globalThis);
}

//https://stackoverflow.com/questions/39583958/conditional-expot-in-es2015
//https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js/55668667

//Does not work in node.js the error is require is not defined
// export let DOMParser;
// if (globalThis.DOMParser === undefined) {
//     const jsdom = require("jsdom")
//     const { JSDOM } = jsdom
//     global.DOMParser = new JSDOM().window.DOMParser
// } else {
//     DOMParser = globalThis.DOMParser;
// }