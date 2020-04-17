import { convert } from "../lib/gpsVisualizer/convert.js"
import { parsePlainTextResponse } from "../lib/gpsVisualizer/parsePlainTextResponse.js"
import parseTrackPoints from "../lib/parseTrackPoints.js"

import { str2dom } from "../lib/xmlReadFile.js"
import { promises as fs } from "fs";
import * as _fs from "fs";

import { dirname, filename } from 'dirname-filename-esm';
/* beautify preserve:start */
const __dirname = dirname(import.meta);
const __filename = filename(import.meta);
/* beautify preserve:end */

import assert from "assert";
import { assertContains } from "./lib/assert.js";
describe("my libs test", () => {
  it("parseTrackPoints parses DOO and returns JS array of trackpints", () => {
    const gpxDom = str2dom(`<?xml version="1.0" encoding="UTF-8"?>
        <gpx creator="Garmin" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" >
        <trk>
            <name>2 points</name>
            <type>mountain_biking</type>
            <trkseg>
            <trkpt lat="48.201424665749073028564453125" lon="17.14423812925815582275390625">
                <ele>151.399993896484375</ele>
                <time>2020-03-31T14:22:52.000Z</time>
            </trkpt>
            <trkpt lat="48.20144101046025753021240234375" lon="17.14419378899037837982177734375">
                <ele>151.600006103515625</ele>
                <time>2020-03-31T14:22:53.000Z</time>
            </trkpt>
            </trkseg>
        </trk>
        </gpx>
    `);
    const pointsJs = parseTrackPoints(gpxDom);
    console.log(pointsJs);
    assertContains(pointsJs[0],
      {
        lat: 48.20142466574907,
        lon: 17.144238129258156,
        time: 1585664572000,
        ele: 151.39999389648438,
        distance: { delta: 0, total: 0 },
        slope: { delta: 0, total: 0 }
      });
    assertContains(pointsJs[1],
      {
        lat: 48.20144101046026,
        lon: 17.14419378899038,
        time: 1585664573000,
        ele: 151.60000610351562,
        distance: { delta: 3.764, total: 3.764 },
        slope: { delta: 0.05313820590628321, total: 0.05313820590628321 }
      }
    )
  })

});
describe("gpsVisualizer tests", () => {
  it("accepts array of strings in input, output is array of string", async function () {
    this.timeout(0);
    const gpxStr = `<?xml version="1.0" encoding="UTF-8"?>
      <gpx creator="Garmin" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" >
      <trk>
          <name>2 points</name>
          <type>mountain_biking</type>
          <trkseg>
          <trkpt lat="48.201424665749073028564453125" lon="17.14423812925815582275390625">
              <ele>151.399993896484375</ele>
              <time>2020-03-31T14:22:52.000Z</time>
          </trkpt>
          <trkpt lat="48.20144101046025753021240234375" lon="17.14419378899037837982177734375">
              <ele>151.600006103515625</ele>
              <time>2020-03-31T14:22:53.000Z</time>
          </trkpt>
          </trkseg>
      </trk>
      </gpx>
    `;
    const converted = await convert({}, [gpxStr]);
    //console.log(converted);
    assert(Array.isArray(converted));
    assert(typeof converted[0] === "string");
    assert.deepStrictEqual(converted, [
      'type\ttime\tlatitude\tlongitude\taltitude (m)\tspeed (km/h)\tslope (%)\tdistance (km)\tdistance_interval (m)\tname\tdesc\n' +
      'T\t2020-03-31 14:22:52\t48.201424666\t17.144238129\t151.4\t\t\t0.000\t\t2 points\t\n' +
      'T\t2020-03-31 14:22:53\t48.201441010\t17.144193789\t151.6\t13.5\t5.3\t0.004\t3.76\t\t\n'
    ]);
    return converted;
  });
  it('Supports { convert_format: "gpx" }', async function () {
    // problem with gpx output is that it is missing 
    // non standard properties (slope distance etc)
    // so we better use csv to get them
    this.timeout(0);
    const gpxStr = `<?xml version="1.0" encoding="UTF-8"?>
      <gpx creator="Garmin" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" >
      <trk>
          <name>2 points</name>
          <type>mountain_biking</type>
          <trkseg>
          <trkpt lat="48.201424665749073028564453125" lon="17.14423812925815582275390625">
              <ele>151.4</ele>
              <time>2020-03-31T14:22:52.000Z</time>
          </trkpt>
          <trkpt lat="48.20144101046025753021240234375" lon="17.14419378899037837982177734375">
              <ele>151.6</ele>
              <time>2020-03-31T14:22:53.000Z</time>
          </trkpt>
          </trkseg>
      </trk>
      </gpx>
    `;
    const converted = await convert({
      convert_format: "gpx"
    }, [gpxStr]);
    //console.log(converted)
    assert.deepStrictEqual(converted, [
      '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n' +
      '<gpx version="1.0" creator="GPS Visualizer https://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">\n' +
      '<trk>\n' +
      '  <name>2 points</name>\n' +
      '  <trkseg>\n' +
      '    <trkpt lat="48.201424666" lon="17.144238129">\n' +
      '      <ele>151.4</ele>\n' +
      '      <time>2020-03-31T14:22:52Z</time>\n' +
      '    </trkpt>\n' +
      '    <trkpt lat="48.20144101" lon="17.144193789">\n' +
      '      <ele>151.6</ele>\n' +
      '      <time>2020-03-31T14:22:53Z</time>\n' +
      '      <speed>3.76</speed>\n' +
      '    </trkpt>\n' +
      '  </trkseg>\n' +
      '</trk>\n' +
      '</gpx>\n'
    ]);
  });
  it("Support parsing plain text (csv responses) from web", () => {
    const response = 'type\ttime\tlatitude\tlongitude\taltitude (m)\tspeed (km/h)\tslope (%)\tdistance (km)\tdistance_interval (m)\tname\tdesc\n' +
      'T\t2020-03-31 14:22:52\t48.201424666\t17.144238129\t151.4\t\t\t0.000\t\t2 points\t\n' +
      'T\t2020-03-31 14:22:53\t48.201441010\t17.144193789\t151.6\t13.5\t5.3\t0.004\t3.76\t\t\n'

    const parsed = parsePlainTextResponse(response); //string of buffer
    //console.log(parsed);
    assert(typeof parsed === "object");
    assert.deepStrictEqual(parsed,
      [
        {
          type: 'T',
          time: 43921.59921296296,
          latitude: 48.201424666,
          longitude: 17.144238129,
          'altitude (m)': 151.4,
          'distance (km)': 0,
          name: '2 points'
        },
        {
          type: 'T',
          time: 43921.599224537036,
          latitude: 48.20144101,
          longitude: 17.144193789,
          'altitude (m)': 151.6,
          'speed (km/h)': 13.5,
          'slope (%)': 5.3,
          'distance (km)': 0.004,
          'distance_interval (m)': 3.76
        }
      ]
    )
  });
})