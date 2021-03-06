// Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NDViM2NkNi0xYTE2LTRlZTUtODBlNy05M2Q4ODg4M2NmMTQiLCJpZCI6MjU5LCJpYXQiOjE1MTgxOTc4MDh9.sld5jPORDf_lWavMEsugh6vHPnjR6j3qd1aBkQTswNM";


const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
});

const promise = Cesium.KmlDataSource.load("../../../gis-projects/data/others/roland/skalica/activity_4192640906.kml", {
  camera: viewer.scene.camera,
  canvas: viewer.scene.canvas,
  clampToGround: true
});

Cesium.when(promise, function(dataSource) {
  viewer.dataSources.add(dataSource);
  viewer.flyTo(promise);
});