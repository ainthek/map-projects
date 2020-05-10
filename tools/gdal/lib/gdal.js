const { spawnP2 } = require('./spawnP.js');
const tmp = require("tmp-promise");
const fs = require("fs").promises;

const DEM = `${__dirname}/../../../../gis-projects/data/zbgis/DMR3.5/10m/dmr3_5_10.tif`;

const CRS_102065_4936 = "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813975277778 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485.0,169.5,483.8,7.786,4.398,4.103,0.0 +units=m +no_defs"

const gdallocationinfo = (lines, inputDem) => spawnP2(
  "gdallocationinfo", [
  inputDem,
  '-valonly',
  "-l_srs", CRS_102065_4936
], {}, lines);

const transform = (inputCoordinates, s_srs, t_srs) => spawnP2(
  "gdaltransform", [
  "-s_srs", s_srs,
  "-t_srs", t_srs
], {}, inputCoordinates);

const clip = (ulx, uly, lrx, lry, inputDem, outputDem) => spawnP2(
  "gdal_translate", [
  "-projwin", ...`${ulx} ${uly} ${lrx} ${lry}`.split(" "),
  "-of", "GTiff",
  "-co", "COMPRESS=NONE",
  "-co", "BIGTIFF=IF_NEEDED",
  inputDem,
  outputDem
], {}, []);

const scale = (xres, yres, inputDem, outputDem) => spawnP2(
  "gdal_translate", [
  "-tr", xres, yres,
  "-r", "bilinear",
  inputDem,
  outputDem
], {}, []);

const eleDMR = async (lonLat) => {

  const inLines = lonLat.map(({ lon, lat }) => `${lon} ${lat}`);

  const outLines = await transform(inLines, "EPSG:4326", CRS_102065_4936);

  let longLatTransormed = [], minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
  // calculate extent and remove 3 num from next input
  for (const line of outLines) {
    const [lon, lat, _] = line.split(" ");
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    longLatTransormed.push(`${lon} ${lat}`);
  }
  // clip dmr (with 100m padding)and save in temp
  const clipedDem = await tmp.tmpName({ postfix: ".tif" });
  await clip(minLon - 100, maxLat + 100, maxLon + 100, minLat - 100, DEM, clipedDem);
  // scale to 
  const rescaledDem = await tmp.tmpName({ postfix: ".tif" });
  await scale(1, 1, clipedDem, rescaledDem);
  const elevs = await gdallocationinfo(longLatTransormed, rescaledDem);
  //console.error(inLines.map((_, i) => `${String(i + 1).padStart(5, ' ')}\t${inLines[i]}\t${longLatTransormed[i]}\t${elevs[i]}`).join("\n"));
  await Promise.all([fs.unlink(clipedDem), fs.unlink(rescaledDem)]);
  return elevs;
}
const git = module.exports = {
  eleDMR, transform
}