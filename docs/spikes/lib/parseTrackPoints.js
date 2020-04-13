import distVincenty from "./distVincenty.js";
const MISSING_ELE = { textContent: 0 };
const trkpt2js = (point, i, points) => ({
    lat: +point.getAttribute("lat"),
    lon: +point.getAttribute("lat"),
    time: Date.parse(point.getElementsByTagName("time")[0].textContent),
    ele: +(point.getElementsByTagName("ele")[0] || MISSING_ELE).textContent
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
const parseTrackpoints = (dom) => Array.from(dom.getElementsByTagName("trkpt"))
    .map(trkpt2js)
    .map(addDistance)
    .map(addSlope)

export default parseTrackpoints;  