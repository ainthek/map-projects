import fs from "fs";
import { convert } from "./convert.js";
//const [, , ...files] = process.argv;
const files = ["test/data/simple.gpx","test/data/simple.gpx"];
const streams = files.map((file) => fs.readFileSync(file))
convert({}, streams).then(console.log);