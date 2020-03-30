const fetch = require("node-fetch");
const encodedPolyLine = require('google-polyline');
const xmlbuilder = require('xmlbuilder');

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

const [, , SEGMENT_ID] = process.argv;
const STRAVA_ACCESS_TOKEN = process.env["STRAVA_ACCESS_TOKEN"];

fetch(`https://www.strava.com/api/v3/segments/${SEGMENT_ID}`, { //TODO: sanitize
    method: 'get',
    headers: { 'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}` }
  })
  .then(resp => resp.json())
  .then(segmentJson => {
    const { name, map: { polyline } } = segmentJson;

    const xml = xmlbuilder.begin((chunk) => process.stdout.write(chunk));
    xml
      .dec()
      .ele("gpx", { xmlns: 'http://www.topografix.com/GPX/1/1' })
      .ele("trk")
      .ele("name", name).up()
      .ele("trkseg");

    encodedPolyLine.decode(polyline)
      .forEach(([lat, lon]) => xml.ele("trkpt", { lat, lon }).up())

    xml.end();
  })


