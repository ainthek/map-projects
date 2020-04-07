import { readFileAsString, readFileAsDom, readFileAsJs, str2dom, str2js } from "./lib/xmlReadFile.js";
import { dropbox } from "./lib/dropbox.js";

main();

function main() {

  dropbox(document.getElementById("dropbox"), handleFiles);

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(files);
      readFileAsString(file)
        .then(async (xmlStr) => {
          const str = xmlStr;
          const dom = str2dom(str);
          const js = await str2js(str);

          console.log(str, dom, js);
        })
    }
  }
}