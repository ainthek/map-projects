const { spawnP2 } = require('./spawnP.js');

const source = (dmr) => {
  const sources = {
    "3.5.10m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/10m/dmr3_5_10.tif`,
    "3.5.25m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/25m/dmr3_5_25.tif`,
    "3.5.50m": `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/50m/dmr3_5_50.tif`
  }
  const resolved = sources[dmr];

  if (!resolved) throw new Error(`No DMR file for ${dmr}`);
  console.error("using",resolved);
  return resolved
}
const eleWGS84 = (lonLat, dmr) => spawnP2("gdallocationinfo", [source(dmr), '-valonly', '-wgs84'], {}, lonLat.map(({ lon, lat }) => `${lon} ${lat}`));

const git = module.exports = {
  eleWGS84
}