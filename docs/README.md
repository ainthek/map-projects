# map-projects

Just experiments with geo data, and additional infos (tests) and additional objects (3d models) and various engines and frameworks.


Topics of interest
 
- Authoring Maps
- Publishing Maps
- Embeding Maps
- Exporting/Importing Data
- ...
- More Complex Processing Pipelines

Comparison:

- ArcGis vs. Cesium <http://www.ika.ethz.ch/studium/cartography_lab/2017_staehli_report.pdf>
- Comparison of bicycle route planning websites <https://en.wikipedia.org/wiki/Comparison_of_bicycle_route_planning_websites>
-------------
# Data Sources

## ZBGIS

- https://www.geoportal.sk/sk/zbgis_smd/na-stiahnutie/
- http://www.gku.sk/files/gku/produkty-sluzby/na-stiahnutie/gku_produkty.pdf


# Authoring Maps

Creating your own maps, sharing maps, contributing to global maps.
- [freemap.sk]
- [Google MyMaps]
- [uMap]
- [Google Earth Web]
- [Google Earth Studio]
- [Google Earth Pro]
- [ArcGIS Online]
- [QGis]
- ...



## [ArcGIS Online]

Cons:
- slow, unresponsive, crashing
- incorrect images URL resolving from KML

# Publishing Maps

General:

- [Google MyMaps]
- [Google Earth Web]
- [Google Earth Studio]

Sports specific:

- [ayvri]
- [Relive]
- <https://www.bikemap.net/> TODO: review

# Authoring Stories/Videos/Presentations

## [Google Earth Pro] 

- <https://developers.google.com/kml/documentation/touring>
- <https://uwaterloo.ca/library/geospatial/sites/ca.library.geospatial/files/uploads/files/google_earth_2016_1.pdf>

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

Cesium with KML from Google Earth Pro `<gx:Track>` and `<LinesString>`


<iframe width="100%" height="500px"
	src="https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https://raw.githubusercontent.com/ainthek/map-projects/master/doc/data/samples/animated/2Tracks/2Tracks-OnePath2.kml&view=17.117977768647275%2C48.21516358587874%2C553.5685019284648%2C281.525245591343%2C-21.391550202590636%2C359.79865247344674">
</iframe>	

## [Relive]

<iframe src=https://www.relive.cc/view/vdvmBp7J8xO/explore width=100% height=600px></iframe>

<https://www.relive.cc/view/vdvmBp7J8xO/explore>
--------------

# Exporting/Importing Data

## TODO List
- how to set Default View on embeded Google MyMap

# FIT
TODO:

# GPX

## Routes, Tracks, Waypoints

- waypoints : layer of features of OGR type wkbPoint
- routes : layer of features of OGR type wkbLineString
- tracks : layer of features of OGR type wkbMultiLineString

Articles:

- [Routes, Tracks and Waypoints - The Other RTW](http://www.globeriders.com/article_pages/article08_RTW/article08_rtw.shtml)
- [Garmin, Differences Between Routes and Tracks](https://support.garmin.com/en-US/?faq=v0rJAHy2hq3prHjRlxdRw5)
- [GDAL, GPX driver](https://gdal.org/drivers/vector/gpx.html)
- A QGIS plugin to visualize GPX-data as line-segments between track points <https://www.salzburgresearch.at/blog/a-qgis-plugin-to-visualize-gpx-data-as-line-segments-between-track-points/>

## GPX 'layers' (ogrinfo) 

From gdal point of view GPX consists of layers:

	1: waypoints (Point)
	2: routes (Line String)
	3: tracks (Multi Line String)
	4: route_points (Point)
	5: track_points (Point)


# KML

## flat line labels

<https://groups.google.com/forum/#!topic/kml-support-getting-started/JHFbwg2g49Y>

## altitudeMode
<https://developers.google.com/kml/documentation/altitudemode>

When exporting clamped, the [Google Earth Pro] does not export anything:QGis 

	<Point>
		<coordinates>17.8344385075128,48.8283710884721,0</coordinates>
	</Point>

When exporting relativeToGround it looks like this:

	<Point>
		<altitudeMode>relativeToGround</altitudeMode>
		<coordinates>17.8344385075128,48.8283710884721,0</coordinates>
	</Point>

## KML Support in [Cesium]

<https://github.com/CesiumGS/cesium/issues/873>

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

## Tesellate

KML requires <tessellate>1</tessellate> be set on line strings in order for them to conform to terrain. 
None of the strings in the file you posted have this set. I updated the file and now it loads as expected in Cesium.

from: <https://github.com/CesiumGS/cesium/issues/873>

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
- brew install [gpsbabel]

## Articles to review

- Visualizing a Bike Ride in 3D <https://willgeary.github.io/GPXto3D/>
- https://github.com/workingDog/kml2czml
- https://github.com/openlayers/ol-cesium


# Workflows

GDAL gdal-cheat-sheet <https://github.com/dwtkns/gdal-cheat-sheet>

## Cliping GPX files

- https://gis.stackexchange.com/questions/258518/how-to-clip-very-large-shapefile-in-qgis-using-ogr2ogr

	ogr2ogr -clipsrc c.shp y.shp x.shp/track_points.shp


## Getting geometry from GPX track (line)

Command:

	ogr2ogr -f CSV /vsistdout/ -sql 'select OGR_GEOM_WKT from tracks' docs/data/samples/animated/2Tracks/00-track.trailforks.gpx

Will print something like this:

	"MULTILINESTRING ((17.104864 48.222693,17.104869 48.222474,17.104993 48.222389,17.105576 48.222162,17.105701 48.222131,17.105682 48.222187,17.105583 48.222294,17.105517 48.222395,17.105496 48.222485,17.105595 48.222455,17.105789 48.222418,17.106073 48.222494,17.106363 48.222548,17.106602 48.222608,17.106802 48.222537,17.106903 48.22244,17.107055 48.222211....


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

## Remove part of Tracks from recorder GXP file
You have 2 rides in gpx, different but with the same segment (MTB trail),
you want to extract only the points common for both rides.

- import gpx1 and gpx2 into qgis
- turn on labels on both layers to show point numbers
- find number of points from-to and from-to common for both tracks (visually)

For each track:
- open attribute table and select points from track1 
- copy, 
- Edit>Paste feature As->Temorary Scratch layer
- Point To Paths, save to templ layer
- Temp Layer - Export To GPX, FORCE_TRACKS=YES

You should have now 2 files in GPX format with `<trk> format` on disk.

BUT `<TIME>` is LOST !!!! SO THIS METHOD IS GOOD TO CREATE PATHS without times
and not real TRACKS.

HOW TO DO IT INCLUDING TIME ?

- import gpx1 and gpx2 into qgis
- turn on labels on both layers to show point numbers
- find number of points from-to and from-to common for both tracks (visually)
- open attribute table and select points from track1 
- copy, 
- Edit>Paste feature As->GPX

You end up with GPX file as waypoints including elevation and time.

Now Google Earth can handle them and create line strings (Paths) and kml tracks (gx:Track/when)


## Align dates on 2 rides
This works with Tracks from Google Earth

Now you have 2 files with same track ridden 2 times or by 2 riders and you want to compare them.
Files are in GPX waypoint format

- import to Google Earth Pro
- Copy as Track (on Waypoints)
- Paste
- Save pasted layer as KML

same for file 2

now you have 04-rider1.track.kml and 04-rider2.track.kml

Lets align dates on both tracks.

Files have these strating dates

- 04-rider1.track.kml 2016-03-30T13:15:15Z
- 04-rider2.track.kml 2020-03-15T12:08:55Z

Align dates:

	../../../../tools/kml-align-when.sh 2020-03-15T12:08:55Z  04-rider1.track.kml > 04-rider1.track.aligned.kml

Now you have:

- 04-rider1.track.aligned.kml 2020-03-15T12:08:55Z
- 04-rider2.track.kml 2020-03-15T12:08:55Z




## Convert GPX with WPTs to GPX with Track 

Ani jedno z tohot mi nejde:

- https://www.gpsvisualizer.com 
- gpsbabel -i gpx -f 03-rider1.selected-points.wpt.gpx -x transform,wpt=trk,del,rptdigits=2 -o gpx -F route.gpx 

- https://issues.qgis.org/issues/11542

zatial sa mi zda ze mi to ide z gpkg ktory je multiline string

	ogr2ogr -f GPX -lco FORCE_GPX_TRACK=YES _exports/test.gpx 01-access-road-70-157.gpkg

toto sa zda ze IDE:

	gpsbabel -i gpx -f ../gis-projects/qgis/banik/clip-orig-elev.gpx  -x transform,trk=wpt -x nuketypes,waypoints -o gpx -F output.track.gpx

# Node.js GEO libs

- https://www.npmjs.com/package/ogr2ogr

-------------------------------------

References:
[freemap.sk]: http://wiki.freemap.sk/HomePage
[uMap]: https://umap.openstreetmap.fr
[Google MyMaps]: https://google.com/mymaps
[Google Earth Web]: https://earth.google.com/web/
[Google Earth Studio]: https://earth.google.com/studio/
[QGis]: https://qgis.org/
[Google Earth Pro]: https://www.google.com/earth/versions/
[[ArcGIS Online]: https://maps.arcgis.com/index.html

[Cesium]:https://cesium.com/
[Cesium-Viewer]:https://cesium.com/cesiumjs/cesium-viewer
[Cesium Sources]: https://github.com/CesiumGS/cesium.git
[Sandcastle]: https://sandcastle.cesium.com/
[cesium-ion]: https://cesium.com/cesium-ion/

[Relive]: https://relive.cc
[ayvri]: https://ayvri.com/

[KML]: https://developers.google.com/kml
[CZML]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide
[GPX]: https://www.topografix.com/gpx.asp

[OCG WMTKS]: https://www.ogc.org/standards/wmts

[dgal]: https://gdal.org/
[xmlstarlet]: http://xmlstar.sourceforge.net/


