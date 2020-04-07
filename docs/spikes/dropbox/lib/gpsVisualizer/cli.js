import fs from "fs";
import { convert } from "./convert.js";
//const [, , ...files] = process.argv;
const files = ["test/data/simple.gpx","test/data/simple.gpx"];
const strings = files.map((file) => fs.readFileSync(file,"utf8"));
convert({}, strings).then(console.log);