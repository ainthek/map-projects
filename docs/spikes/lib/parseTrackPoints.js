import distVincenty from "./distVincenty.js";
// TODO: d3 XS import ?
// TODO: simple-statistic XS import ?
// TODO: this cannot be url, nide sill not wotk need dual module again ?
//import { median, mean, mode } from "https://unpkg.com/simple-statistics@7.0.8/index.js?module"
//let simple_statistics; (async ()=>simple_statistics=await import("./simple-statistics.js"))()
//import { median, mean, mode } from "simple-statistics";
//import { median, mean, mode } from "https://unpkg.com/simple-statistics@7.0.8/index.js?module";
//const { median, mean, mode } = await import("simple-statistics");
// this wotks but is far from ideal syntax
import { median, mean, mode } from "../node_modules/simple-statistics/dist/simple-statistics.mjs";

const MISSING_ELE = { textContent: 0 };
const MISSING_TIME = { textContent: undefined };
const trkpt2js = (point, i, points) => (
    Object.defineProperty(
        // public
        {
            // essentials
            lat: +point.getAttribute("lat"),
            lon: +point.getAttribute("lon"),
            time: Date.parse((point.getElementsByTagName("time")[0] || MISSING_ELE).textContent),
            ele: +(point.getElementsByTagName("ele")[0] || MISSING_ELE).textContent,
            // others
            sym: +(point.getElementsByTagName("sym")[0] || MISSING_ELE).textContent,
            type: +(point.getElementsByTagName("type")[0] || MISSING_ELE).textContent,
            //extensions, lax I do not care abou NS or nesting in extensions
            // this is fine for garmin samples, if more needed add || here 
            hr: +(point.querySelector("extensions hr") || MISSING_ELE).textContent,
            cad: +(point.querySelector("extensions cad") || MISSING_ELE).textContent
        },
        // private
        "_domNode", { value: point }
    )
);
const addDistance = (point, i, points) => {
    const previous = points[i - 1];
    const delta = previous ? distVincenty(previous.lat, previous.lon, point.lat, point.lon) : 0;
    const total = previous ? previous.distance.total + delta : 0;
    return Object.assign(points[i], {
        distance: { delta, total },
    });
};
const addSlope = (point, i, points) => {
    const previous = points[i - 1];
    const eleDelta = previous && point.ele - previous.ele
    const delta = previous && point.distance.delta ? eleDelta / point.distance.delta : 0;
    const total = previous ? previous.slope.total + delta : 0;
    return Object.assign(points[i], {
        slope: { delta, total, eleDelta }
    });
}
const add3dDistance = (point, i, points) => {
    const previous = points[i - 1];
    const delta = previous && Math.sqrt(point.distance.delta ** 2 + point.slope.delta ** 2);
    const total = previous ? previous.distance3d.total + delta : 0;
    return Object.assign(points[i], {
        distance3d: { delta, total }
    });
}
const addSpeed = (point, i, points) => {
    const previous = points[i - 1];
    const deltaT = previous && point.time - previous.time; //ms
    const d = previous && point.distance.delta; //m
    return Object.assign(points[i], {
        deltaT,
        //
        speed: ((d / deltaT)/*m/ms*/ * 1000 /*ms*/ * 3.6 /*km/h*/) || 0,
        //spee3d: (d / deltaT * 3600) || 0
    });
}

// TODO: refactor to pipe or one function
const parseTrackPoints = (dom) => Array.from(dom.getElementsByTagName("trkpt"))
    .map(trkpt2js)
    .map(addDistance)
    .map(addSlope)
    .map(add3dDistance)
    .map(addSpeed)

const statsTrackPoints = (trackpoints) => {
    const lastPoint = trackpoints[trackpoints.length - 1];
    const elevationExtent = d3.extent(trackpoints, d => d.ele);
    //console.log(trackpoints.map(({ deltaT }) => deltaT));
    return {
        "trackpoints": trackpoints.length,
        // biking stats
        "distance (elipsoid)": lastPoint.distance.total,
        "distance (terrain)": lastPoint.distance3d.total,
        "distance (terrain Δ)": lastPoint.distance3d.total - lastPoint.distance.total,
        "elevation (extent)": elevationExtent,
        "elevation Δ": elevationExtent[1] - elevationExtent[0],
        "ascent": d3.sum(trackpoints, d => Math.max(0, d.slope.eleDelta)),
        "descent": d3.sum(trackpoints, d => Math.min(0, d.slope.eleDelta)),
        // data stats
        "<ele> missing": trackpoints.filter(p => p.ele == 0).length, //TODO: better keep as null and make getter
        "sample rate (median time s)": median(trackpoints.slice(1).map(({ deltaT }) => deltaT)) / 1000,
        "sample rate (mean time s)": mean(trackpoints.slice(1).map(({ deltaT }) => deltaT)) / 1000,
        "sample rate (extent)": d3.extent(trackpoints, d => d.deltaT),
        "sample rate (median dist m)": median(trackpoints.slice(1).map(({ distance: { delta } }) => delta)),
        "sample rate (mean dist m)": mean(trackpoints.slice(1).map(({ distance: { delta } }) => delta))
    }

}
export default parseTrackPoints;
export { parseTrackPoints, statsTrackPoints }