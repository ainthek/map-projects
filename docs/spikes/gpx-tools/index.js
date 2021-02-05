import { dropbox } from "../lib/dropbox.js";
import { readFileAsString, str2dom } from "../lib/xmlReadFile.js";
import { XMLSerializer } from "../lib/DOMParser.js";
import parseTrackPoints from "../lib/parseTrackPoints.js";
const NS_GPX = "http://www.topografix.com/GPX/1/1";
//const NS_MY_EXT = "https://ainthek.github.io/"; // NTH: full uri and real schema ?
const NS_MY_EXT = "ex"; // something short since this is on every element now
//xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
//const NS_GPXTPX="http://www.garmin.com/xmlschemas/TrackPointExtension/v1";

main();
async function main() {
    const algorithms = {
        all: async ({ data }) => {
            
            data=await algorithms.removeZeroSpeed({data});
            data=await algorithms.detectStops({data});
            data=await algorithms.processExtensions({data});
            //data=await algorithms.segmentize({data});
            return data;
        },
        removeZeroSpeed: async ({ data }) => {

            // TODO: assert <time> is present othetwise makes no sense
            const gpxDom = str2dom(data);
            const inputTrackpints = parseTrackPoints(gpxDom);
            inputTrackpints
                .filter(p => p.speed === 0)
                .forEach(p => p._domNode.remove());
            return new XMLSerializer().serializeToString(gpxDom);
        },
        detectStops: async ({ data }) => {
            // TODO: assert <time> is present othetwise makes no sense
            // tto je logicky fajn pri realnom autostop z hodiniek
            // ale treba to este upravit 
            const gpxDom = str2dom(data);
            const inputTrackpints = parseTrackPoints(gpxDom);
            inputTrackpints.map((trkpt, i, trkpts) => {
                const deltaT = trkpt.deltaT;
                if (deltaT > 60000) { //TODO: make parameter
                    trkpt = trkpts[i - 1];
                    const wpt = document.createElementNS(NS_GPX, "wpt");
                    wpt.setAttribute("lat", trkpt.lat);
                    wpt.setAttribute("lon", trkpt.lon);
                    const name = wpt.appendChild(document.createElementNS(NS_GPX, "name"));
                    name.textContent = `pause for ${formatDelta(deltaT)}`;
                    gpxDom.documentElement.appendChild(wpt)
                }
            })

            return new XMLSerializer().serializeToString(gpxDom);
        },
        processExtensions: async ({ data }) => {

            const gpxDom = str2dom(data);
            const inputTrackpints = parseTrackPoints(gpxDom);
            inputTrackpints.forEach(p => {

                let extensions = p._domNode.getElementsByTagName("extensions")[0];
                if (extensions) extensions.remove();
                extensions = p._domNode.appendChild(document.createElementNS(NS_GPX, "extensions"));
                const addExtension = (value, name) => extensions.appendChild(document.createElementNS(NS_MY_EXT, name)).textContent = value;
                // TODO: avoid explit list of fields, generalize the code, flaten object, autogenerate names...
                // common extensions parsed by parseTrackPoints
                const { hr, cad, distance = {}, slope = {}, speed, deltaT } = p;
                addExtension(hr, "hr");
                addExtension(cad, "cad");
                //
                // 0.0 is only to cause some parser to consider numbers as floats and not ints
                // when they receive first record, they gues type INT
                // and the others get unparsed
                addExtension(distance.delta || "0.0", "distance_delta");
                addExtension(distance.total || "0.0", "distance_total");
                //slope: { delta, total, eleDelta }
                addExtension(slope.delta || "0.0", "slope_delta");
                addExtension(slope.total || "0.0", "slope_total");
                addExtension(slope.eleDelta || "0.0", "slope_eleDelta");
                addExtension(deltaT || "0.0", "deltaT");
                addExtension(speed || "0.0", "speed");
            });
            return new XMLSerializer().serializeToString(gpxDom);
        },
        segmentize: async ({ data }) => {

            const gpxDom = str2dom(data);
            const inputTrackpints = parseTrackPoints(gpxDom);
            // gpxDom.querySelectorAll("trkseg")
            //     .forEach(seg => seg.remove())
            gpxDom.querySelectorAll("trk")
                .forEach(seg => seg.remove())

            inputTrackpints.reduce((a, b, i) => {
                console.log(i, a, b)
                const trk = gpxDom.getElementsByTagName("gpx")[0]
                    .appendChild(document.createElementNS(NS_GPX, "trk"))
                const seg = trk
                    .appendChild(document.createElementNS(NS_GPX, "trkseg"))
                // const seg = gpxDom.getElementsByTagName("trk")[0]
                //     .appendChild(document.createElementNS(NS_GPX, "trkseg"))
                seg.appendChild(a._domNode);
                seg.appendChild(b._domNode.cloneNode(true));
                //TODO: all extension shell be parsed in inputTrackpints
                const toCopy = b._domNode.getElementsByTagName("extensions")[0];
                toCopy && trk.appendChild(toCopy.cloneNode(true));

                return b;
            });
            return new XMLSerializer().serializeToString(gpxDom);
        },
    };
    document.querySelectorAll("section.algorithm").forEach(section => {
        const algorithm = section.getAttribute("id");
        const input = section.querySelector(".input");
        const output = section.querySelector(".output");
        dropbox(input, async (files, input) => {
            const file = files[0];
            const data = await readFileAsString(file);
            input.value = data;

            const result = await algorithms[algorithm]({ data });
            output.value = result;
        });
        input.addEventListener("change", async () => {
            //alert();
            const data = input.value;
            const result = await algorithms[algorithm]({ data });
            output.value = result;
        })
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