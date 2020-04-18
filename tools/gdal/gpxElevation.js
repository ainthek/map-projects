const fs = require("fs");
const { Parser, Builder } = require("xml2js");
const { eleWGS84 } = require("./lib/gdal.js");

main();


async function main() {
  const [, , GPX_IN, DMR = '3.5.10m'] = process.argv;

  let inStream = process.stdin
  let outStream = process.stdout;
  let GPX_OUT;

  if (GPX_IN) {
    inStream = fs.createReadStream(GPX_IN);
    GPX_OUT = GPX_IN + `.${DMR}.gpx`;
    outStream = fs.createWriteStream(GPX_OUT);
  }
  await parseAndBuildXml({
    inStream: inStream,
    outStream: outStream,
    transform: (gxpJs) => addElevation(gxpJs, DMR),
  });
  if (GPX_OUT) {
    console.error("output:", GPX_OUT);
  }
}



async function parseAndBuildXml({ inStream, transform = async (x) => x, outStream }) {

  const xmlIn = await read(inStream);

  const js = await new Parser().parseStringPromise(xmlIn);
  const transformed = await transform(js);
  const xml = new Builder().buildObject(transformed).toString();

  return new Promise((resolve, reject) => {
    outStream.end(xml, (err) => {
      err && reject(err) || resolve();
    });
  })
}
async function read(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function addElevation(gxpJs, dmr) {

  const done = [];
  const points = gxpJs.gpx.trk.map(({ trkseg }) => trkseg.map(({ trkpt }) => trkpt)).flat(Infinity);
  const coordinates = points.map(({ $: { lon, lat } }) => ({ lon, lat }));
  const elevs = await eleWGS84(coordinates, dmr);
  points.forEach((point, i) => Object.assign(point, { ele: elevs[i] })); // mutating

  return gxpJs;
}

// mozno in sposob parsovania
//< ../gis-projects/qgis/elevation-profiles/iPhoneGps.eleZero.gpx grep "<trkpt" | cut -d'"' -f2,4 | trim | tr  '"' " " | head -n10 | gdalinfo /Volumes/data/_WORK/gis-projects/data/zbgis/DMR3-5_10/dmr3_5_10.tif -wgs84
// const { Parser } = require("htmlparser2");
// const { DomHandler } = require("domhandler");
// const {getOuterHTML} = 
// const handler = new DomHandler(function(error, dom) {
//     if (error) {
//         throw err;
//     } else {
//         // Parsing completed, do something
//         console.log(getOuterHTML(dom));
//     }
// });
// const parser = new Parser(handler);
// process.stdin.pipe(parser);