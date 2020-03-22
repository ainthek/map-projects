# map-projects

Just experiments with geo data, and additional infos (tests) and additional objects (3d models) and various engines and frameworks.
here you will find my "daily blog" with random mission and down below are som more collected and structured data.


## Work Log

### 22.03.2020

### How to embed [Cesium] Viewer with my KML data ?
I already have KMLs of BMX tracks and now I want them in cesium viewer,
and embed them in my page. No programming if possible.

Trying this <https://groups.google.com/forum/#!topic/cesium-dev/lY-7IDU4tkk>:

Viewer:

	https://cesiumjs.org/Cesium/Build/Apps/CesiumViewer/index.html?source=

Source:

	https://raw.githubusercontent.com/ainthek/map-projects/master/data/samples/BMXRaceTracks.googleearthpro.kml

Link:

<https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https%3A%2F%2Fraw.githubusercontent.com%2Fainthek%2Fmap-projects%2Fmaster%2Fdata%2Fsamples%2FBMXRaceTracks.googleearthpro.kml&view=19.190566511163134%2C45.936826109815165%2C308637.71944634%2C5.088887490341627e-14%2C-47.596971672906086%2C360>

Embeded with IFrame:

<iframe width="100%" height="500px"
	src="https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https%3A%2F%2Fraw.githubusercontent.com%2Fainthek%2Fmap-projects%2Fmaster%2Fdata%2Fsamples%2FBMXRaceTracks.googleearthpro.kml&view=19.190566511163134%2C45.936826109815165%2C308637.71944634%2C5.088887490341627e-14%2C-47.596971672906086%2C360">
</iframe>	

![Buried by cesium](./2020-03-22-cesium.png)

TODO: review KMLs elevation data, try GPX etc.....

Display [GPX] in [Cesium] ? is it possible ? So far I get unrecognized format

So let's try KML->GPX->KML

Data:

	data/samples/BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml

Link: 

	https://raw.githubusercontent.com/ainthek/map-projects/master/data/samples/BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml

Cesium:

	<https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https://raw.githubusercontent.com/ainthek/map-projects/master/data/samples/BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml>

Result: BURIED AGAIN even with the simples KML

### So what is "CesiumViewer" ? https://cesiumjs.org/Cesium/Build/Apps/CesiumViewer/index.html

What code processes the KML file and why is this burial happening ?

- <https://github.com/CesiumGS/cesium/issues/4327>

Source Code of Cesium Viewer

- <https://github.com/CesiumGS/cesium/tree/master/Apps/CesiumViewer>

Status: UNRESOLVED posted my questions here:

- <https://groups.google.com/forum/?hl=en#!searchin/cesium-dev/KML$20loading$20problems$20altitude%7Csort:date/cesium-dev/8TNmM0nQvSk/kVUF2l7_BwAJ>
- <https://github.com/CesiumGS/cesium/issues/4327>

## Detour - studying CZML

cloning [Cesium Sources]

I have ended up with creating relativelly good looking PINs with correct positioning in ZCML.

	{

    "id": "Pumptrack, Bošáca",
    "position":
    {
      "cartographicDegrees": [17.8344385075128, 48.8283710884721, 0.0]
    },
    "billboard":
    {
      "image":
      {
        "uri": "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png"
      },
      "heightReference": "CLAMP_TO_GROUND",
      "verticalOrigin": "BOTTOM",
      "scaleByDistance":
      {
        "nearFarScalar": [1.0, 1, 500000.0, 0.2]
      }
    }
  }

So the translation from KML will be pretty streight forward.
  

---------------------------------------------

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

<p>
<a href="https://umap.openstreetmap.fr/en/map/bmx-race-tracks-and-pumptracks-in-slovakia_434133">See full screen</a>
</p>

## [Google MyMaps]
Also one click process.

<iframe src="https://www.google.com/maps/d/embed?mid=1CgHIC2MTQMYrkcSair-y9QncFLes4dal" width="640" height="480"></iframe>



--------------

# Exporting/Importing Data

## TODO List
- how to set Default View on embeded Google MyMap


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

# Toolbox

- [dgal]
- [xmlstarlet]

## Articles to review

- Visualizing a Bike Ride in 3D <https://willgeary.github.io/GPXto3D/>
- https://github.com/workingDog/kml2czml

# Workflows

## Testing [CZML] files 

Just open [Cesium-Viewer] and drag and drop file from local disk.


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

[KML]: https://developers.google.com/kml
[CZML]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide

[dgal]: https://gdal.org/
[xmlstarlet]: http://xmlstar.sourceforge.net/

