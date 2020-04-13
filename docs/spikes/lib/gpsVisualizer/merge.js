export { tracks };

function tracks(original, enhanced) {
  // mutating
  original.gpx.trk.forEach((trk, trk_id) =>
    trk.trkseg.forEach((trkseg, trkseg_id) =>
      trkseg.trkpt.forEach((trkpt, trkpt_id) => {
        const etrkpt = enhanced.gpx.trk[trk_id].trkseg[trkseg_id].trkpt[trkpt_id];
        console.error("merging", etrkpt)
        Object.assign(trkpt, etrkpt);
      })
    )
  )
 
  original.gpx.$.creator = [original.gpx.$.creator, enhanced.gpx.$.creator, "@aintek/map-projects"]
    .filter(Boolean).join(" + ")
  
  return original;
}