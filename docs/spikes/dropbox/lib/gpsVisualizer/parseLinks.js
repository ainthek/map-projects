export { parseLinks };

import htmlparser2 from "htmlparser2";
const uniq = (arr) => [...new Set(arr)];

const RE_DOWNLOAD_LINK = /display\/convert/;

function parseLinks(response, linkMatcher) {
  return new Promise((resolve, reject) => {
    const links = [];
    const parser = new htmlparser2.Parser({
      onopentag(name, attribs) {
        if (name === "a" && attribs.href && attribs.href.match(RE_DOWNLOAD_LINK)) {
          links.push(attribs.href);
        }
      }, // TODO: error
      onend() {
        resolve(uniq(links));
      }
    }, { decodeEntities: true });
    if (typeof response === "string") {
      parser.write(response)
      parser.end();
    } else {
      const stream = response;
      stream
        .on("readable", function() {
          let chunk;
          while (null !== (chunk = stream.read())) {
            parser.write(chunk);
          }
        })
        .on("end", () => parser.end())
        .on("error", reject);
    }
  })
}