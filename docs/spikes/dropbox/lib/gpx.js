// unfinisher reimplementation of gpxFile in JS
// seems ugly and terrible with JS, so gpxXmlImpl.js started

class Gpx {
  constructor(js) {

    Object.defineProperty(this, "js", { value: js });

    const { js: { gpx } } = this;
    const { trk, wpt, rte } = gpx;

    trk.forEach(trk => trk.trkseg.forEach(trkseg => trkseg.trkpt.forEach(addTimeStats)));

  }
  valueOf() {
    return this.js;
  }
  addAutostops() {

    const { js: { gpx } } = this;
    let { trk, wpt } = gpx;
    wpt || (wpt = gpx.wpt = []);

    const autostopWpts = trk.map((trk, trk_id) => trk.trkseg.map((trkseg, trkseq_id) => trkseg.trkpt.slice(1).map((trkpt, i, trkpts) => {
      if (trkpt.time_stats.time_delta > 60000) {
        const previous = trkpts[i - 1];
        const { lat, lon } = previous.$;
        wpt.push({
          wpt: {
            "$": { lat, lon },
            "name": `${trk_id}.${trkseq_id}.${i} - pause for ${formatDelta(trkpt.time_stats.time_delta)}`
          }
        })
      }
    })));
  }
  get waypoints() {
    const { js: { gpx } } = this;
    let { wpt } = gpx;
    return wpt;
  }
  get stats() {

    // 1: waypoints (Point)
    // 2: routes (Line String)
    // 3: tracks (Multi Line String)

    // 4: route_points (Point)
    // 5: track_points (Point)



    const { js: { gpx } } = this;
    const { trk: tracks, wpt: waypoints, rte: routes } = gpx;

    return {
      multi_layer: (+!!tracks) + (+!!waypoints) + (+!!routes) > 1,
      tracks: {
        multi_track: tracks.length > 1,
        ...tracks.map((trk) => ({
          multi_segment: trk.trkseg.length > 1,
          ...trk.trkseg.map((trk) => ({
            track_points: trk.trkpt.length,
            ...times(trk.trkpt)
          }))
        }))
      },
      waypoints: waypoints && {
        count: waypoints.length
      }
      // waypoints: wpt && wpt.length,
      // routes: rte && rte.length
    }
  }
}
const gpx = (js) => new Gpx(js);

function times(track_points) {

  const deltas = track_points
    .slice(1)
    .map(trkpt => trkpt.time_stats && trkpt.time_stats.time_delta);

  const min = Math.min.apply(null, deltas);
  const max = Math.max.apply(null, deltas);
  const hasTime = track_points.some(trkpt => Boolean(trkpt.time_stats && trkpt.time_stats.time_mils));
  const time_sampling_ms = hasTime && (Object.is(min, max) ? min : { min, max });
  const times_autostop = hasTime && max > 10000;
  return {
    time: hasTime,
    time_sampling_ms,
    times_autostop
  }
}

function addTimeStats(trkpt, i, trkpts) {
  if (!trkpt.time) return;
  const time_mils = Date.parse(trkpt.time);
  const previous = trkpts[i - 1];
  const time_delta = previous && time_mils - Date.parse(previous.time);
  Object.defineProperty(trkpt, "time_stats", { value: { time_mils, time_delta } });
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


export { gpx };