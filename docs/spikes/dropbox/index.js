import { xmlReadFile } from "./lib/xmlReadFile.js";
import { dropbox } from "./lib/dropbox.js";

main();

function main() {

  dropbox(document.getElementById("dropbox"),handleFiles);

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(files);
      xmlReadFile(file).then(console.log);
    }
  }
}