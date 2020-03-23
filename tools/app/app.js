// Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NDViM2NkNi0xYTE2LTRlZTUtODBlNy05M2Q4ODg4M2NmMTQiLCJpZCI6MjU5LCJpYXQiOjE1MTgxOTc4MDh9.sld5jPORDf_lWavMEsugh6vHPnjR6j3qd1aBkQTswNM";

var viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
});
viewer.scene.globe.depthTestAgainstTerrain = false;

const BASE = "https://raw.githubusercontent.com/ainthek/map-projects/master/data/samples";
const kmlA = `${BASE}/BMXRaceTracks.googleearthpro.kml`;
const kmlB = `${BASE}/BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml`;
const kmlC = `${BASE}/BMXRaceTracks.mymaps.kml`;
const kmlFile = kmlB;




var promise = Cesium.KmlDataSource.load("../../data/samples/BMXRaceTracks.googleearthpro.kml", {
  camera: viewer.scene.camera,
  canvas: viewer.scene.canvas,
  clampToGround: true
});

Cesium.when(promise, function(dataSource) {
  viewer.dataSources.add(dataSource);
  viewer.flyTo(promise);
});