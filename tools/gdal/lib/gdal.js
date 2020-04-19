const { spawnP2 } = require('./spawnP.js');

const source = (dmr) => {
  const sources = {
    "3.5.10m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/10m/dmr3_5_10.tif`,
    "3.5.25m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/25m/dmr3_5_25.tif`,
    "3.5.50m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/50m/dmr3_5_50.tif`
  }
  const resolved = sources[dmr];

  if (!resolved) throw new Error(`No DMR file for ${dmr}`);
  console.error("using", resolved);
  return resolved
}
const gdallocationinfo = (lines, dmr) => spawnP2("gdallocationinfo", [source(dmr), '-valonly', "-l_srs", "EPSG:5514"], {}, lines);
const transform = (lines, s_srs, t_srs) => spawnP2("gdaltransform", ["-s_srs", s_srs, "-t_srs", t_srs], {}, lines);

const eleDMR = async (lonLat, dmr) => {
  
  const lines = lonLat.map(({ lon, lat }) => `${lon} ${lat}`);
  const longLatTranslated = await transform(lines, "EPSG:4326", "EPSG:5514");
  
  const longLatTranslated2=longLatTranslated.map(line => {
    const [lat, lon, _] = line.split(" ");
    return `${lat} ${lon}`;
  });
  const elevs = await gdallocationinfo(longLatTranslated2, dmr);
  
  return elevs;
}
const git = module.exports = {
  eleDMR, transform
}