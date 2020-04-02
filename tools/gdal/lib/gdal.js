const { spawnP2 } = require('./spawnP.js');
const split = require('split2');

const DMR_FILE = "/Volumes/data/_WORK/gis-projects/data/zbgis/DMR3-5_10/dmr3_5_10.wg84.tif"; //TODO:

const eleWGS84 = (lonLat) => spawnP2("gdallocationinfo", [DMR_FILE, '-valonly', '-wgs84'], {}, lonLat.map(({ lon, lat }) => `${lon} ${lat}`));

const git = module.exports = {
  eleWGS84
}