// Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NDViM2NkNi0xYTE2LTRlZTUtODBlNy05M2Q4ODg4M2NmMTQiLCJpZCI6MjU5LCJpYXQiOjE1MTgxOTc4MDh9.sld5jPORDf_lWavMEsugh6vHPnjR6j3qd1aBkQTswNM";


const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
});


// Source
// crs=EPSG:5514&dpiMode=7&format=image/jpgpng&layers=WMS_zbgis_ortofoto_wmts&styles=default&tileMatrixSet=default028mm&url=https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get?


const zbgisOrtofoto = new Cesium.WebMapTileServiceImageryProvider({
  //    https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get/tile/1.0.0/WMS_zbgis_ortofoto_wmts/default/default028mm/8/87/141
  url: "https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get/tile/1.0.0/WMS_zbgis_ortofoto_wmts/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}",
  style: 'default',
  format: 'image/jpg',
  tileMatrixSetID:'default028mm',
  layer:"WMS_zbgis_ortofoto_wmts"
});
const layer = viewer.imageryLayers.addImageryProvider(zbgisOrtofoto);


const promise = Cesium.KmlDataSource.load("../../../gis-projects/data/others/roland/skalica/activity_4192640906.kml", {
  camera: viewer.scene.camera,
  canvas: viewer.scene.canvas,
  clampToGround: true
});

Cesium.when(promise, function(dataSource) {
  viewer.dataSources.add(dataSource);
  viewer.flyTo(promise);
});