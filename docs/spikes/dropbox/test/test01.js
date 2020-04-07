import { gpx } from "../lib/gpx.js";

import assert from "assert";
import { promises as fs } from "fs";
import * as _fs from "fs";

import xml2js from "xml2js";
const { Parser, Builder } = xml2js;

import { dirname, filename } from 'dirname-filename-esm';
import { parseLinks } from "../lib/gpsVisualizer/parseLinks.js";

/* beautify preserve:start */
const __dirname = dirname(import.meta);
const __filename = filename(import.meta);
/* beautify preserve:end */


it("parseLinks string", () => {

  const responseText = _fs.readFileSync(`${__dirname}/data/gpsVisualizer.response.html`, "utf8");
  return parseLinks(responseText)
    .then((links) => {
      assert.deepStrictEqual(links, ['/display/convert/20200407025801-59126-data.gpx']);
    })

});
it("parseLinks stream", () => {

  const responseStream = _fs.createReadStream(`${__dirname}/data/gpsVisualizer.response.html`, "utf8");
  return parseLinks(responseStream)
    .then((links) => {
      assert.deepStrictEqual(links, ['/display/convert/20200407025801-59126-data.gpx']);
    })

});

it("test", async function() {
  assert(true);
  //const strXML = await fs.readFile(`${__dirname}/data/multi.gpx`);
  const strXML = await fs.readFile(`${__dirname}/data/time.gpx`);
  const js = await new Parser().parseStringPromise(strXML);
  const g1 = gpx(js);
  console.log(JSON.stringify(g1.stats, null, 2));
  // const x = [{ name: 1 }, { name: 2 }].reduce((r,v,k) => (r[`track-${k}`] = v, r), {});
  // console.log(JSON.stringify(x, null, 2));

});

it("addAutostops", async function() {
  assert(true);
  //const strXML = await fs.readFile(`${__dirname}/data/multi.gpx`);
  const strXML = await fs.readFile(`${__dirname}/data/time.gpx`);
  const js = await new Parser().parseStringPromise(strXML);
  const g1 = gpx(js);
  console.log(JSON.stringify(g1.stats, null, 2));
  g1.addAutostops();
  const xml = new Builder().buildObject(g1.valueOf()).toString();

  await fs.writeFile(`${__dirname}/data/time.autostops.gpx`, xml);
});