import { gpx } from "../../lib/gpx.js";

import assert from "assert";
import { promises as fs } from "fs";
import * as _fs from "fs";

import xml2js from "xml2js";
const { Parser, Builder } = xml2js;
import { tracks as mergeTracks } from "../../lib/gpsVisualizer/merge.js";
import { parseLinks } from "../../lib/gpsVisualizer/parseLinks.js";
import { dirname, filename } from 'dirname-filename-esm';

//import { stats } from "../lib/statsXmlIml.js";
import { str2dom } from "../../lib/xmlReadFile.js";

import jsdom from "jsdom";
import distVincenty from "../../lib/distVincenty.js";
import immutable from "immutable";
const { List } = immutable;

/* beautify preserve:start */
const __dirname = dirname(import.meta);
const __filename = filename(import.meta);
/* beautify preserve:end */



it("immutable POC", async () => {
  const arr = [{ v: 0 }, { v: 1 }, { v: 2 }]
  // const arr1=arr.map((a,i,arr)=>({
  //   ...a,
  //   get d(){
  //     const previous=arr[i-1];
  //     return this.v-previous.v;
  //   }
  // }));
  // assert.equal(arr1[2].d,1);
  // const arr2=arr1.filter((_,i)=>i!=1);
  // assert.equal(arr2[1].d,2);

  // const list = List(arr).map((a, i, iter) => ({
  //   ...a,
  //   get d() {
  //     console.log(iter);
  //     const previous=iter.get(i-1);
  //     return this.v-previous.v;
  //   }
  // }))
  // const list2=list.filter((_,i)=>i!=1);
  // console.log(list2.get(1).d)

});

it("str2dom POC", async () => {
  const { JSDOM } = jsdom;
  let { DOMParser, XMLDocument, Document } = new JSDOM().window;
  let test = new DOMParser().parseFromString("<aaa/>", "text/xml");
  assert(test instanceof Document);
  //.window.DOMParser;
  str2dom("<aaa/>");
});
it("str2dom on GPX file", async () => {
  const strXML = await fs.readFile(`${__dirname}/../../compare-profiles/samples/01-srtm1.gpx`);
  const dom = str2dom(strXML)
  // var xpathResult = document.evaluate(
  //   xpathExpression,
  //   contextNode,
  //   namespaceResolver,
  //   resultType,
  //   result
  // );
  const trkpt2js = (point, i, points) => ({
    lat: point.getAttribute("lat"),
    lon: +point.getAttribute("lat"),
    ele: +point.getElementsByTagName("ele")[0].textContent
  });
  const addDistance = (point, i, points) => {
    const previous = points[i - 1];
    const delta = previous ? distVincenty(previous.lat, previous.lon, point.lat, point.lon) : 0;
    const total = previous ? previous.distance.total + delta : 0;
    return Object.assign(points[i], {
      distance: { delta, total }
    });
  };
  const addSlope = (point, i, points) => {
    const previous = points[i - 1];

    const delta = previous && point.distance.delta ? (point.ele - previous.ele) / point.distance.delta : 0;
    const total = previous ? previous.slope.total + delta : 0;
    return Object.assign(points[i], {
      slope: { delta, total }
    });
  }
  const trkpts = Array.from(dom.getElementsByTagName("trkpt"))
    .map(trkpt2js)
    .map(addDistance)
    .map(addSlope)

    console.log(trkpts);
});

it("merge", async () => {
  const original = '<?xml version="1.0" encoding="UTF-8"?>\n'
  '<gpx creator="Garmin Connect" version="1.1"\n' +
    '  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/11.xsd"\n' +
    '  xmlns:ns3="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"\n' +
    '  xmlns="http://www.topografix.com/GPX/1/1"\n' +
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns2="http://www.garmin.com/xmlschemas/GpxExtensions/v3">\n' +
    '  <metadata>\n' +
    '    <link href="connect.garmin.com">\n' +
    '      <text>Garmin Connect</text>\n' +
    '    </link>\n' +
    '    <time>2020-03-31T14:22:52.000Z</time>\n' +
    '  </metadata>\n' +
    '  <trk>\n' +
    '    <name>Bratislava Horské bicyklovanie</name>\n' +
    '    <type>mountain_biking</type>\n' +
    '    <trkseg>\n' +
    '      <trkpt lat="48.201424665749073028564453125" lon="17.14423812925815582275390625">\n' +
    '        <ele>151.399993896484375</ele>\n' +
    '        <time>2020-03-31T14:22:52.000Z</time>\n' +
    '        <extensions>\n' +
    '          <ns3:TrackPointExtension>\n' +
    '            <ns3:atemp>18.0</ns3:atemp>\n' +
    '            <ns3:hr>124</ns3:hr>\n' +
    '            <ns3:cad>63</ns3:cad>\n' +
    '          </ns3:TrackPointExtension>\n' +
    '        </extensions>\n' +
    '      </trkpt>\n' +
    '      <trkpt lat="48.20144101046025753021240234375" lon="17.14419378899037837982177734375">\n' +
    '        <ele>151.600006103515625</ele>\n' +
    '        <time>2020-03-31T14:22:53.000Z</time>\n' +
    '        <extensions>\n' +
    '          <ns3:TrackPointExtension>\n' +
    '            <ns3:atemp>18.0</ns3:atemp>\n' +
    '            <ns3:hr>124</ns3:hr>\n' +
    '            <ns3:cad>62</ns3:cad>\n' +
    '          </ns3:TrackPointExtension>\n' +
    '        </extensions>\n' +
    '      </trkpt>\n' +
    '      <trkpt lat="48.20145576260983943939208984375" lon="17.14415355585515499114990234375">\n' +
    '        <ele>151.399993896484375</ele>\n' +
    '        <time>2020-03-31T14:22:54.000Z</time>\n' +
    '        <extensions>\n' +
    '          <ns3:TrackPointExtension>\n' +
    '            <ns3:atemp>18.0</ns3:atemp>\n' +
    '            <ns3:hr>122</ns3:hr>\n' +
    '            <ns3:cad>63</ns3:cad>\n' +
    '          </ns3:TrackPointExtension>\n' +
    '        </extensions>\n' +
    '      </trkpt>\n' +
    '    </trkseg>\n' +
    '  </trk>\n' +
    '</gpx>';
  const enhanced = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
    '<gpx version="1.0" creator="GPS Visualizer https://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n' +
    '<trk>\n' +
    '  <name>Bratislava Horské bicyklovanie</name>\n' +
    '  <trkseg>\n' +
    '    <trkpt lat="48.201424666" lon="17.144238129">\n' +
    '      <ele>146.096</ele>\n' +
    '      <time>2020-03-31T14:22:52Z</time>\n' +
    '    </trkpt>\n' +
    '    <trkpt lat="48.20144101" lon="17.144193789">\n' +
    '      <ele>146.169</ele>\n' +
    '      <time>2020-03-31T14:22:53Z</time>\n' +
    '      <speed>3.76</speed>\n' +
    '    </trkpt>\n' +
    '    <trkpt lat="48.201455763" lon="17.144153556">\n' +
    '      <ele>146.277</ele>\n' +
    '      <time>2020-03-31T14:22:54Z</time>\n' +
    '      <speed>3.41</speed>\n' +
    '    </trkpt>\n' +
    '  </trkseg>\n' +
    '</trk>\n' +
    '</gpx>\n';

  const o = await new Parser().parseStringPromise(original);
  const e = await new Parser().parseStringPromise(enhanced);

 
  mergeTracks(o, e);

  const x = new Builder().buildObject(o).toString()
  //console.log(x);


});

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

it("test", async function () {
  assert(true);
  //const strXML = await fs.readFile(`${__dirname}/data/multi.gpx`);
  const strXML = await fs.readFile(`${__dirname}/data/time.gpx`);
  const js = await new Parser().parseStringPromise(strXML);
  const g1 = gpx(js);
  //console.log(JSON.stringify(g1.stats, null, 2));
  // const x = [{ name: 1 }, { name: 2 }].reduce((r,v,k) => (r[`track-${k}`] = v, r), {});
  // console.log(JSON.stringify(x, null, 2));

});

it("addAutostops", async function () {

  //const strXML = await fs.readFile(`${__dirname}/data/multi.gpx`);
  const strXML = await fs.readFile(`${__dirname}/data/time.gpx`);
  const js = await new Parser().parseStringPromise(strXML);
  const g1 = gpx(js);
  //console.log(JSON.stringify(g1.stats, null, 2));
  g1.addAutostops();
  const xml = new Builder().buildObject(g1.valueOf()).toString();

  await fs.writeFile(`${__dirname}/data/time.autostops.gpx`, xml);
});