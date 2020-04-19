const { spawnP2 } = require('./spawnP.js');

const source = (dmr) => {
  const sources = {
    "3.5.10m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/10m/dmr3_5_10.tif`,
    "3.5.25m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/25m/dmr3_5_25.tif`,
    "3.5.50m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/50m/dmr3_5_50.tif`
  }
  //return `${__dirname}/../../../../gis-projects/qgis/elevation-profiles/okrajovka/dmr-clip-resampled.tif`
  const resolved = sources[dmr];

  if (!resolved) throw new Error(`No DMR file for ${dmr}`);
  console.error("using", resolved);
  return resolved
}
const CRS_102065_4936 = "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485.0,169.5,483.8,7.786,4.398,4.103,0.0 +units=m +no_defs"
const gdallocationinfo = (lines, dmr) => spawnP2("gdallocationinfo", [source(dmr), '-valonly', "-l_srs", CRS_102065_4936], {}, lines);
const transform = (lines, s_srs, t_srs) => spawnP2("gdaltransform", ["-s_srs", s_srs, "-t_srs", t_srs], {}, lines);

const eleDMR = async (lonLat, dmr) => {
  
  const lines = lonLat.map(({ lon, lat }) => `${lon} ${lat}`);
  const longLatTranslated = await transform(lines, "EPSG:4326", CRS_102065_4936);
  
  const longLatTranslated2=longLatTranslated.map(line => {
    const [lat, lon, _] = line.split(" ");
    return `${lat} ${lon}`;
  });
  const elevs = await gdallocationinfo(longLatTranslated2, dmr);
  console.error(lines.map((_,i)=>`${String(i+1).padStart(5,' ')}\t${lines[i]}\t${longLatTranslated[i]}\t${elevs[i]}`).join("\n"));
  return elevs;
}
const git = module.exports = {
  eleDMR, transform
}