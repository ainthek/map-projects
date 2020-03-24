# map-projects

Just experiments with geo data, and additional infos (tests) and additional objects (3d models) and various engines and frameworks.

Topics of interest

- Authoring Maps
- Punlishing Maps
- Embeding Maps
- Exporting/Importing Data
- ...
- More Complex Processing Pipelines

-------------
# Authoring Maps

Creating your own maps, sharing maps, contributing to global maps.

- [Google MyMaps]
- [uMap]
- [Google Earth Web]
- [Google Earth Studio]
- [Google Earth Pro]
- [QGis]
- ...

# Exporting/Importing Data

## Google MyMaps

Pros:

- supports hierarchical KMLs and splits to layers automatically
- understands styles of icons exported from Google Earth Pro

Cons:

- reimporting and merging does not exist, must be done manually
- live update even from Google Drive data does not exists

## uMap

- 

# Embeding Maps

## [uMap]
On of the user friendly is [uMap].
This is my map authored in GoogleEarth Pro (Desktop), and published in uMap, and embeded from uMap.

<iframe width="100%" height="300px" frameborder="0" allowfullscreen 
	src="https://umap.openstreetmap.fr/en/map/bmx-race-tracks-and-pumptracks-in-slovakia_434133?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false">
</iframe>

<https://umap.openstreetmap.fr/en/map/bmx-race-tracks-and-pumptracks-in-slovakia_434133>

## [Google MyMaps]
Also one click process.

<iframe src="https://www.google.com/maps/d/embed?mid=1CgHIC2MTQMYrkcSair-y9QncFLes4dal" width="640" height="480"></iframe>

<https://www.google.com/maps/d/embed?mid=1CgHIC2MTQMYrkcSair-y9QncFLes4dal>

## [Cesium]
IFramew with extrenal map as source= parameter, (still buggy)

<iframe width="100%" height="500px"
	src="https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https%3A%2F%2Fraw.githubusercontent.com%2Fainthek%2Fmap-projects%2Fmaster%2Fdata%2Fsamples%2FBMXRaceTracks.googleearthpro.kml">
</iframe>	

## [Relive]

<iframe src=https://www.relive.cc/view/vdvmBp7J8xO/explore width=100% height=600px></iframe>

<https://www.relive.cc/view/vdvmBp7J8xO/explore>
--------------

# Exporting/Importing Data

## TODO List
- how to set Default View on embeded Google MyMap


# GPX

## Routes, Tracks, Waypoints

- waypoints : layer of features of OGR type wkbPoint
- routes : layer of features of OGR type wkbLineString
- tracks : layer of features of OGR type wkbMultiLineString

Articles:

- [Routes, Tracks and Waypoints - The Other RTW](http://www.globeriders.com/article_pages/article08_RTW/article08_rtw.shtml)
- [Garmin, Differences Between Routes and Tracks](https://support.garmin.com/en-US/?faq=v0rJAHy2hq3prHjRlxdRw5)
- [GDAL, GPX driver](https://gdal.org/drivers/vector/gpx.html)


# KML

## altitudeMode
<https://developers.google.com/kml/documentation/altitudemode>

When exporting clamped, the [Google Earth Pro] does not export anything:

	<Point>
		<coordinates>17.8344385075128,48.8283710884721,0</coordinates>
	</Point>

When exporting relativeToGround it looks like this:

	<Point>
		<altitudeMode>relativeToGround</altitudeMode>
		<coordinates>17.8344385075128,48.8283710884721,0</coordinates>
	</Point>

## Hierarchical KML

Google Earth Pro as well as Google MyMaps, display all features in tree view.
Earth calls them "Folders" (this comes from KML structure) and MyMaps call the layers.

Example of this type of KML looks like this.

This is importalnt feature, since various tools handle this structure differently.

XML exported from GoogleEarth looks like this:

	$ xmlstarlet el ./data/samples/BMXRaceTracks.googleearthpro.kml | grep Folder$

	kml/Document/Folder
	kml/Document/Folder/Folder
	kml/Document/Folder/Folder
	kml/Document/Folder/Folder
	kml/Document/Folder/Folder

XML imported to MyMaps and then exported to KML:

	xmlstarlet el ./data/samples/BMXRaceTracks.mymaps.kml | grep Folder$

	kml/Document/Folder
	kml/Document/Folder
	kml/Document/Folder
	kml/Document/Folder	

Actually this 2 level structure is more logical and it does not contain 
useless level 2 "MyPlaces" Folder in KML.	

# CZML

- <https://www.npmjs.com/package/czml-writer>

# WMTKS (World Map Tiled Service)

Zobrazovacia služba WMTS (Web Map Tile Service) je štandardom 
vyvinutým a rozširovaným združením Open Geospatial Consortium (OGC). 

WMTS pracuje podobne ako zobrazovacie služby WMS, 
avšak údaje sú predpripravené na strane servera (cache) 
a optimalizované do formy mapových dlaždíc (tiles) 
z dôvodu dosiahnutia vyššej rýchlosti pri prehliadaní

Specs:

- [OCG WMTKS]

Sources:

- ...
- ...
- ZBGIS <https://www.geoportal.sk/sk/sluzby/mapove-sluzby/wmts/wmts-zbgis.html>

Cesium.js:

- WebMapTileServiceImageryProvider <https://cesium.com/docs/cesiumjs-ref-doc/WebMapTileServiceImageryProvider.html>
	- (cons) limited projections support <https://github.com/openlayers/ol-cesium/issues/37>

Gdal:
- <https://gdal.org/drivers/raster/wmts.html>



# Toolbox

- [dgal]
- [xmlstarlet]

## Articles to review

- Visualizing a Bike Ride in 3D <https://willgeary.github.io/GPXto3D/>
- https://github.com/workingDog/kml2czml
- https://github.com/openlayers/ol-cesium


# Workflows

## Testing [CZML] files 

Just open [Cesium-Viewer] and drag and drop file from local disk.

## GPX Converting Tracks to Routes and viceversa
Using [GDAL, GPX driver](https://gdal.org/drivers/vector/gpx.html)

The GPX writer supports the following layer creation options:

	FORCE_GPX_TRACK: By default when writing a layer whose features are of type wkbLineString, 
	the GPX driver chooses to write them as routes. 
	If FORCE_GPX_TRACK=YES is specified, they will be written as tracks.
	
	FORCE_GPX_ROUTE: By default when writing a layer whose features are of type wkbMultiLineString, 
	the GPX driver chooses to write them as tracks. 
	If FORCE_GPX_ROUTE=YES is specified, they will be written as routes, 
	provided that the multilines are composed of only one single line.

Exporting lines tracks:

	ogr2ogr -f GPX -lco FORCE_GPX_TRACK=YES _exports/test.gpx 01-access-road-70-157.gpkg
	
Batch:

	ls -1 *.gpkg | xargs -I {} ogr2ogr -f GPX -lco FORCE_GPX_TRACK=YES _exports/{}.gpx {} 
	
-------------------------------------

References:

[uMap]: https://umap.openstreetmap.fr
[Google MyMaps]: https://google.com/mymaps
[Google Earth Web]: https://earth.google.com/web/
[Google Earth Studio]: https://earth.google.com/studio/
[QGis]: https://qgis.org/
[Google Earth Pro]: https://www.google.com/earth/versions/

[Cesium]:https://cesium.com/
[Cesium-Viewer]:https://cesium.com/cesiumjs/cesium-viewer
[Cesium Sources]: https://github.com/CesiumGS/cesium.git
[Sandcastle]: https://sandcastle.cesium.com/
[cesium-ion]: https://cesium.com/cesium-ion/

[Relive]: https://relive.cc

[KML]: https://developers.google.com/kml
[CZML]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide
[GPX]: https://www.topografix.com/gpx.asp

[OCG WMTKS]: https://www.ogc.org/standards/wmts

[dgal]: https://gdal.org/
[xmlstarlet]: http://xmlstar.sourceforge.net/


