import fs from "fs";
import { convert } from "./convert.js";
import xml2js from "xml2js";
const { Parser, Builder } = xml2js;
import { tracks as mergeTracks } from "./merge.js";

const [, , ...files] = process.argv;
//const files = ["test/data/simple.gpx","test/data/simple.gpx"];
const strings = files.map((file) => fs.readFileSync(file, "utf8"));
convert({ 
  convert_format: "gpx",
  add_elevation: "auto",
}, strings).then((enhanced) => {
  if (files.length != 1) {
    console.error("Multi files merge not implemented yet, printing only converted version");
    enhanced.forEach((s) => console.log(s));
    return;
  }
  console.error("Merged result:");
  strings.forEach(async (_, i) => {
    const o = await new Parser().parseStringPromise(strings[i]);
    const e = await new Parser().parseStringPromise(enhanced[i]);
    mergeTracks(o, e);
    const xml = new Builder().buildObject(o).toString()
    console.log(xml);
  });
});