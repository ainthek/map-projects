const fetch = require("node-fetch");
const encodedPolyLine = require('google-polyline');
const xmlbuilder = require('xmlbuilder');
const fs = require("fs");
const path = require("path");
const { slugify } = require("transliteration");

/*
Go to 
  https://www.strava.com/settings/api

Copy "Your Access Token" from gui 

Export:

  export STRAVA_ACCESS_TOKEN=........

Find Segment to convert:
  
  https://www.strava.com/segments/explore

Run 
  node segment2gpx.js 7363237 
*/

const [, , SEGMENT_ID, OUT_DIR] = process.argv;
const STRAVA_ACCESS_TOKEN = process.env["STRAVA_ACCESS_TOKEN"];

//Promise.resolve(require("./test/data/segment7363237.json"))
fetch(`https://www.strava.com/api/v3/segments/${SEGMENT_ID}`, { //TODO: sanitize
    method: 'get',
    headers: { 'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}` }
  })
  .then(resp => resp.json())
  .then(segmentJson => {

    const { name, map: { polyline }, start_latlng, end_latlng } = segmentJson;

    const fullname = `Segment ${SEGMENT_ID} ${name}`;
    const coordinates = encodedPolyLine.decode(polyline)
      .map(([lat, lon]) => [lon, lat].join(","))
      .join(" ")

    const out = OUT_DIR ? fs.createWriteStream(path.resolve(OUT_DIR, slugify(fullname) + ".kml")) : process.stdout;

    const xml = xmlbuilder.begin(chunk => out.write(chunk));
    xml
      .dec()
      .ele("kml", { xmlns: 'http://www.opengis.net/kml/2.2' })
      .ele("Document")
      .ele("name", fullname).up()
      //s.ele("description", `https://www.strava.com/segments/${SEGMENT_ID}`).up()
      //.ele("Folder")
      //.ele("name", fullname).up()
      .ele("Placemark")
      .ele("name", `${fullname}`).up()
      .ele("LineString")
      .ele("coordinates", coordinates).up()
      // for cesium to work
      // <tessellate>1</tessellate>
      // <altitudeMode>clampToGround</altitudeMode>
      .ele("tessellate",1).up()
      .ele("altitudeMode","clampToGround").up()
      .up()
      .up()

      .ele("Placemark")
      .ele("styleUrl", "#start_segment").up()
      .ele("name", `START - ${fullname}`).up()
      .ele("Point")
      .ele("tessellate",1).up()
      .ele("altitudeMode","clampToGround").up()
      .ele("coordinates", start_latlng.reverse().join(",")).up()
      .up()
      .up()


      .ele("Placemark")
      .ele("styleUrl", "#end").up()
      .ele("name", `END -${fullname}`).up()
      .ele("Point")
      .ele("tessellate",1).up()
      .ele("altitudeMode","clampToGround").up()
      .ele("coordinates", end_latlng.reverse().join(","))
      .up()
      .up()


      .up()
      //.up()
      .ele("Style", { id: "start_segment" }).ele("IconStyle").ele("scale", 0.7).up().ele("Icon")
      .ele("href", "https://maps.google.com/mapfiles/kml/paddle/grn-blank.png")
      .up().up().up().up()
      .ele("Style", { id: "end" }).ele("IconStyle").ele("scale", 0.7).up().ele("Icon")
      .ele("href", "https://maps.google.com/mapfiles/kml/paddle/red-blank.png")
      .up().up().up().up()

    xml.end();
  })