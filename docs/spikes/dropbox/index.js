import { readFileAsString, readFileAsDom, readFileAsJs, str2dom, str2js } from "../lib/xmlReadFile.js";
import { dropbox } from "../lib/dropbox.js";

main();

function main() {

  //dropbox(document.getElementById("dropbox"), handleFiles);
  dropbox(document.getElementsByTagName("html")[0], handleFiles);
  var graph = new AreaGraph();

  function handleFiles(files) {
    graph.reset();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(files);
      readFileAsString(file)
        .then(async (xmlStr) => {
          // my way
          const str = xmlStr;
          const dom = str2dom(str);
          const js = await str2js(str);
          //gpx smoother way

          const gpxFile = new GPXFile();
          const gpxFileInfo = gpxFile.parseGPX(str);
          console.log(str, dom, js, gpxFileInfo);
          const { rawValues } = gpxFileInfo
          graph.setLine(rawValues, `line${i+1}`, false);
        })
    }
  }
}