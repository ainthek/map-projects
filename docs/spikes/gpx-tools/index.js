import { dropbox } from "../lib/dropbox.js";
import { readFileAsString, str2dom } from "../lib/xmlReadFile.js";
import { XMLSerializer } from "../lib/DOMParser.js";
import parseTrackPoints from "../lib/parseTrackPoints.js";
const NS_GPX = "http://www.topografix.com/GPX/1/1";

main();
async function main() {
    const algorithms = {
        detectStops: async ({ file, data }) => {
            const gpxDom = str2dom(data);
            const inputTrackpints = parseTrackPoints(gpxDom);
            const waitPoints = inputTrackpints.filter(p => p.deltaT > 60000);
            waitPoints
                .map(trkpt => {
                    const wpt = document.createElementNS(NS_GPX, "wpt");
                    wpt.setAttribute("lat", trkpt.lat);
                    wpt.setAttribute("lon", trkpt.lon);
                    const name = wpt.appendChild(document.createElementNS(NS_GPX, "name"));
                    name.textContent = `pause for ${formatDelta(trkpt.deltaT)}`;
                    return wpt;
                })
                .forEach(wpt => gpxDom.documentElement.appendChild(wpt))
            //"name": `${trk_id}.${trkseq_id}.${i} - pause for ${formatDelta(trkpt.time_stats.time_delta)}`


            // <wpt lat="48.20744932629168" lon="17.121258387342095">
            //     <name>0.0.1266 - pause for 2 m, 10 s</name>
            // </wpt>
            return new XMLSerializer().serializeToString(gpxDom);
        }
    };
    document.querySelectorAll("section.algorithm").forEach(section => {
        const algorithm = section.getAttribute("id");
        const input = section.querySelector(".input");
        const output = section.querySelector(".output");
        dropbox(input, async (files, input) => {
            const file = files[0];
            const data = await readFileAsString(file);
            input.value = data;

            const result = await algorithms[algorithm]({ file, data });
            output.value = result;
        });
    })

}


function formatDelta(milliSecondsIn) {

    let secsIn = ~~(milliSecondsIn / 1000),
        ms = milliSecondsIn % 1000,
        h = ~~(secsIn / 3600),
        remainder = secsIn % 3600,
        m = ~~(remainder / 60),
        s = remainder % 60;

    return Object.entries({ h, m, s, ms }).filter(([k, v]) => v).map(([k, v]) => `${v} ${k}`).join(", ");
}