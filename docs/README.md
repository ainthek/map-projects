# map-projects

Just experiments with geo data, and additional infos (tests) and additional objects (3d models) and various engines and frameworks.
here you will find my "daily blog" with random mission and down below are som more collected and structured data.


## Work Log

### 23.03.2020

Treba sa pohrat z customizaciu viewera, 
kedze vcera som zistil ze veci v [sandcastle] chodia a v [Cesium Viewer] nie.

- https://cesium.com/blog/2016/04/04/an-introduction-to-cesium-desktop-apps-with-electron/
- https://www.electronjs.org/docs/tutorial/first-app
- https://groups.google.com/forum/#!topic/cesium-dev/DMeBWr1LVbY


Detour:
	Geocoding is the process of converting addresses (like "1600 Amphitheatre Parkway, Mountain View, CA") 
	into geographic coordinates (like latitude 37.423021 and longitude -122.083739), 
	which you can use to place markers or position the map.

Uz viem preco sa zda ze to chodi v [sandcastle] a preco to nechodi vo [Cesium Viewer].
Viewer ma standardne zapnuty world terrain a sandcastle nie.


// display depends on this ! burried
viewer.scene.globe.depthTestAgainstTerrain = true;

<https://sandcastle.cesium.com/#c=jVNNj9MwEP0rJkLaVCq2uPZLtOXjAGgRrYBDDuva08TUsSN7klJW+9+ZNAnb7gqJHKJ45r038zyTRgbWGDhCYHPm4MjWEE1d8m/nWHqjzse1dyiNg3AzZveZY/QIwTwWEI4mAjv5mskAbG8ldmmEEIjxJfjGaAiTQVcFkAjffbB620HSUeYeRtPMZY40tYmVlSemoQKnI/OOYWEie5G5rk0eFTjgufU74ITCYgsRlzkpRewlyQqGGlpNaqchi4fS3lZovIuU6x0oWUKQbMKuhLvoeIAQOz6HtNEBYmVZbf2H4GunJ21ZsnN2kzlF9ZCtlpt38ywpEKs4ESLII88NFvWujhAIguCQK18K6pxu9CBKWb2qgv8JCiMdIt2l0BKliFTKQsyS6aM6OVvO717et1UexOrzj69SwTZIdYg89z63ADJgQXqcoHfTC97q/3k815Je1a/u46nS+l9K5YnMxAF/wXhvLMzbHs7hdkRUqWx3aT6sysfSviXXG18HBdx6qdOeOL6YZ7c5PeVYgEt7oTHb1061mFT/lRkNw+8H+piJXGp9iZxeAff2tPWDdJvrVzYZJ7OIJwuLDv7GlJUPyOpgU84FAk2MFj6KXa0OQHOO545nYiDNtGmY0bQgT361LGl3K0bK7GtrN+Y3ZMliJgh/RWsvxrj8toFAP04LKV4vPnVBzvlM0PE5C723OxkuFP8A>


// display depends on this ! not burried
viewer.scene.globe.depthTestAgainstTerrain = false;

<https://sandcastle.cesium.com/#c=jVNNj9MwEP0rJkLaVCq2uPZLtOXjAGgRrYBDDuva08TUsSOPk1JW+9+ZNAnb7gqJHKJ45r038zyTRgbWGDhCYHPm4MjWgKYu+bdzLL1R5+PauyiNg3AzZveZY/QIwXwsIBwNAjv5mskAbG9l7NIRQiDGl+AboyFMBl0VQEb47oPV2w6SjjL3MJpmLnOkqQ1WVp6YhgqcRuYdi4VB9iJzXZscFTjgufU74ISKxRYwLnNSwthLkpW9tAitKPXTkMdDaW+raLxDSvYWlCwhSDZhV8pddDxAiI3PIW10gFhZVlv/Ifja6UkMNZCfs53MKaoX2Wq5eTfPkiLGCidCBHnkuYlFvasRAkEiuMiVLwW1Tld6EKWsXlXB/wQVkQ5Ilym0jFIglbKAWTJ9VCdny/ndy/u2yoNYff7xVSrYBqkOyHPvcwsgQyxIjxP0bnrBW/0/j+da0qv61X08VVr/S6k8kRkc8BeM98bCvO3hHG5HRJXKdpnmw658LO1bcr3xdVDArZc67Ynji3l2q9NTjgW4tBcas33tVItJ9V+Z0TD8fqCPGeRS60vk9Aq4t6etH6TbXL+zyTiZYTxZWHTwN6asfIisDjblXESgidHGo9jV6gA0Zzx3PBMDaaZNw4ymBXnyr2VJu1uIlNnX1m7Mb8iSxUwQ/orWXoxx+W0Dgf6cFlK8XnzqgpzzmaDjc1b03u5kuFD8Aw>


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

<https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https%3A%2F%2Fraw.githubusercontent.com%2Fainthek%2Fmap-projects%2Fmaster%2Fdata%2Fsamples%2FBMXRaceTracks.googleearthpro.kml>

Embeded with IFrame:

<iframe width="100%" height="500px"
	src="https://cesium.com/cesiumjs/cesium-viewer/index.html?source=https%3A%2F%2Fraw.githubusercontent.com%2Fainthek%2Fmap-projects%2Fmaster%2Fdata%2Fsamples%2FBMXRaceTracks.googleearthpro.kml">
</iframe>	

![Buried by cesium](./2020-03-22-cesium.png)

Interesting that this behaves differently in viewer (not working) and in sandbox (working, sometimes):

	var viewer = new Cesium.Viewer('cesiumContainer');
	//viewer.scene.globe.depthTestAgainstTerrain=false;
	//viewer.extend(Cesium.viewerCesiumInspectorMixin);
	var options = {
	camera : viewer.scene.camera,
	canvas : viewer.scene.canvas,
	//elipsoid:Cesium.Ellipsoid.WGS84,
	//clampToGround: true
	terrainProvider: Cesium.createWorldTerrain()
	};
	
	//a cele sa to sprava este inak ked je zapnuty alebo vupnuty inspector
	
	var BASE="https://raw.githubusercontent.com/ainthek/map-projects/master/data/samples/";
	
	//a) OK, this is on, just labels are buries, toto vyzera ok
	var kmlFile = BASE+"BMXRaceTracks.googleearthpro.kml";
	//b) Err, kml with no style information, label are buried, pins are some default banners from Cesium
	//var kmlFile = BASE+"BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml";
	// c) Err, toto je export z google maps, nevidim nic
	//var kmlFile = BASE+"BMXRaceTracks.mymaps.kml"; 
	var promise = Cesium.KmlDataSource.load(kmlFile, options);
	Cesium.when(promise, function(dataSource) {
	viewer.dataSources.add(dataSource);
	
	});
	viewer.flyTo(promise);

TODO: why it is not working in Viewer ? Can we fix it with: 
a) viewer params
b) KML markup ?
c) anything else ?

Status: UNRESOLVED posted my questions here:

- <https://groups.google.com/forum/?hl=en#!searchin/cesium-dev/KML$20loading$20problems$20altitude%7Csort:date/cesium-dev/8TNmM0nQvSk/kVUF2l7_BwAJ>
- <https://github.com/CesiumGS/cesium/issues/4327>

- <https://cesium.com/blog/2018/07/30/billboards-on-terrain-improvements/>

Status este raz:

1. original z google earth (BMXRaceTracks.googleearthpro.kml) ide v Sandboxe, nejde vo Viewri nevidno labels poriadne
2. uplne nenastylovany BMXRaceTracks.googleearthpro.kml.gdal.gpx.gdal.kml, ide v sandboxe, nejde vo Viewri nevidno labels poriadne
3. export z myMaps nejde nikde, lebo relativne styly `<styleUrl>#icon-1899-DB4436-nodesc</styleUrl>`


Source Code of Cesium Viewer

- <https://github.com/CesiumGS/cesium/tree/master/Apps/CesiumViewer>

## Detour - studying CZML

Bude podobny problem z CZML ?

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
[Sandcastle]: https://sandcastle.cesium.com/

[KML]: https://developers.google.com/kml
[CZML]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide

[dgal]: https://gdal.org/
[xmlstarlet]: http://xmlstar.sourceforge.net/

