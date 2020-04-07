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
  return original;
}