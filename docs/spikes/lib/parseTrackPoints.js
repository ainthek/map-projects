import distVincenty from "./distVincenty.js";
const MISSING_ELE = { textContent: 0 };
const MISSING_TIME = { textContent: undefined };
const trkpt2js = (point, i, points) => ({
    lat: +point.getAttribute("lat"),
    lon: +point.getAttribute("lon"),
    time: Date.parse((point.getElementsByTagName("time")[0] || MISSING_ELE).textContent),
    ele: +(point.getElementsByTagName("ele")[0] || MISSING_ELE).textContent
});
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
    const delta = previous && point.distance.delta ? (point.ele - previous.ele) / point.distance.delta : 0;
    const total = previous ? previous.slope.total + delta : 0;
    return Object.assign(points[i], {
        slope: { delta, total }
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
    const t =  previous && point.time - previous.time;
    const d = previous && point.distance.delta;
    return Object.assign(points[i], {
        speed: (d / t * 3600) || 0,
        spee3d: (d / t * 3600) || 0
    });
}
// TODO: refactor to pipe or one function
const parseTrackpoints = (dom) => Array.from(dom.getElementsByTagName("trkpt"))
    .map(trkpt2js)
    .map(addDistance)
    .map(addSlope)
    .map(add3dDistance)
    .map(addSpeed)

export default parseTrackpoints;  