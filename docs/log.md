# Work Log
 
--------------------------------------------------------------------
## 25.03.2020
- Select Lines within a Polygon <https://gis.stackexchange.com/questions/255100/select-lines-within-a-polygon>
- Create “mean” line from multiple lines using QGIS <https://gis.stackexchange.com/questions/123731/create-mean-line-from-multiple-lines-using-qgis>
- merge points <https://gis.stackexchange.com/questions/77043/merge-point-features-within-a-given-radius>

 a nejake hratky z ArcGis Online (caciatky), uz len preto ze ich pouziva Relive

--------------------------------------------------------------------
## 24.03.2020

Digging deeper in animated tracks idea:
Starting from:

- Google Earth pro
- ...
- ...
-
- Cesium
- ...
- Relive

### Google Earth Pro and GPX Import

Ked importujete gpx do Google Earth Pro ponukne vam moznosti:

- Generate KML tracks
- Generate KML Line Strings
- Adjust ...



Z tohto vam vzniknu tri vrstvy (ktore ked exportnete do KMLka) budu vyzerat takto:

- Points.kml
- Paths.kml
- Track.kml

Dalsi sposob ako sa dostart z Track.kml je nad vrstvou kliknut Compy As Track a potom Paste.

Ak si teraz klikne trur nad jednotlivymi vrstvami:

- Points.kml - kamera sa zahrame do zeme a nevidite nic
- Paths.kml - kamera akosi ide ale nevidite bod na trase ktory sa hybe
- Track.kml - konecne nejaka animacia, hybe sa bod a kamera ho "akosi" sleduje

Pome kuknut presny obsah tych KMLiek

#### Points.kml:

- `<trkpt>` z gpx sa zmenilo na `<Placemark>` z KML
- zaroven pre kazdy z nich zgenerovalo `<LookAt>` element ktory by mal obladat kameru: <https://developers.google.com/kml/documentation/kmlreference#lookat>
- a `<TimeStamp>/<when>` ktory zjavne ovlada zobrazenie bodu


    <Placemark>
        <name>Krasnansky trail-8</name>
        <visibility>0</visibility>
        <snippet></snippet>
        <description>
          <![CDATA[<table>
            <tr><td>Longitude: 17.105496 </td></tr>
            <tr><td>Latitude: 48.222485 </td></tr>
            <tr><td>Altitude: 347.992 meters </td></tr>
            <tr><td>Speed: 36.5 km/hour </td></tr>
            <tr><td>Heading: 351.2 </td></tr>
            <tr><td>Time: 2020-03-14T21:32:00Z </td></tr>
            </table>]]>
        </description>
        <LookAt>
          <longitude>17.105496</longitude>
          <latitude>48.222485</latitude>
          <altitude>0</altitude>
          <heading>0</heading>
          <tilt>66</tilt>
          <range>0</range>
        </LookAt>
        <TimeStamp>
          <when>2020-03-14T21:32:00Z</when>
        </TimeStamp>
        <styleUrl>#track-0</styleUrl>
        <Point>
          <coordinates>17.105496,48.222485,347.99</coordinates>
        </Point>
      </Placemark>

Toto ale ani v googleearthpro prehlarelne rozumne nie je.
Ani po drag and drop do [Cesium-Viewer] nie.

Zaujimave je ze CESIUm vie prehrat Tracks.kml. Chyba sice path a ikonka, ale je to celkom fajn.



## 23.03.2020

Treba sa pohrat z customizaciu viewera, 
kedze vcera som zistil ze veci v [sandcastle] chodia a v [Cesium Viewer] nie.

- https://cesium.com/blog/2016/04/04/an-introduction-to-cesium-desktop-apps-with-electron/
- https://www.electronjs.org/docs/tutorial/first-app
- https://groups.google.com/forum/#!topic/cesium-dev/DMeBWr1LVbY


Uz viem preco sa zda ze to chodi v [sandcastle] a preco to nechodi vo [Cesium Viewer].
Viewer ma standardne zapnuty world terrain a sandcastle nie.


// display depends on this ! burried
viewer.scene.globe.depthTestAgainstTerrain = true;

<https://sandcastle.cesium.com/#c=jVNNj9MwEP0rJkLaVCq2uPZLtOXjAGgRrYBDDuva08TUsSN7klJW+9+ZNAnb7gqJHKJ45r038zyTRgbWGDhCYHPm4MjWEE1d8m/nWHqjzse1dyiNg3AzZveZY/QIwTwWEI4mAjv5mskAbG8ldmmEEIjxJfjGaAiTQVcFkAjffbB620HSUeYeRtPMZY40tYmVlSemoQKnI/OOYWEie5G5rk0eFTjgufU74ITCYgsRlzkpRewlyQqGGlpNaqchi4fS3lZovIuU6x0oWUKQbMKuhLvoeIAQOz6HtNEBYmVZbf2H4GunJ21ZsnN2kzlF9ZCtlpt38ywpEKs4ESLII88NFvWujhAIguCQK18K6pxu9CBKWb2qgv8JCiMdIt2l0BKliFTKQsyS6aM6OVvO717et1UexOrzj69SwTZIdYg89z63ADJgQXqcoHfTC97q/3k815Je1a/u46nS+l9K5YnMxAF/wXhvLMzbHs7hdkRUqWx3aT6sysfSviXXG18HBdx6qdOeOL6YZ7c5PeVYgEt7oTHb1061mFT/lRkNw+8H+piJXGp9iZxeAff2tPWDdJvrVzYZJ7OIJwuLDv7GlJUPyOpgU84FAk2MFj6KXa0OQHOO545nYiDNtGmY0bQgT361LGl3K0bK7GtrN+Y3ZMliJgh/RWsvxrj8toFAP04LKV4vPnVBzvlM0PE5C723OxkuFP8A>


// display depends on this ! not burried
viewer.scene.globe.depthTestAgainstTerrain = false;

<https://sandcastle.cesium.com/#c=jVNNj9MwEP0rJkLaVCq2uPZLtOXjAGgRrYBDDuva08TUsSOPk1JW+9+ZNAnb7gqJHKJ45r038zyTRgbWGDhCYHPm4MjWgKYu+bdzLL1R5+PauyiNg3AzZveZY/QIwXwsIBwNAjv5mskAbG9l7NIRQiDGl+AboyFMBl0VQEb47oPV2w6SjjL3MJpmLnOkqQ1WVp6YhgqcRuYdi4VB9iJzXZscFTjgufU74ISKxRYwLnNSwthLkpW9tAitKPXTkMdDaW+raLxDSvYWlCwhSDZhV8pddDxAiI3PIW10gFhZVlv/Ifja6UkMNZCfs53MKaoX2Wq5eTfPkiLGCidCBHnkuYlFvasRAkEiuMiVLwW1Tld6EKWsXlXB/wQVkQ5Ilym0jFIglbKAWTJ9VCdny/ndy/u2yoNYff7xVSrYBqkOyHPvcwsgQyxIjxP0bnrBW/0/j+da0qv61X08VVr/S6k8kRkc8BeM98bCvO3hHG5HRJXKdpnmw658LO1bcr3xdVDArZc67Ynji3l2q9NTjgW4tBcas33tVItJ9V+Z0TD8fqCPGeRS60vk9Aq4t6etH6TbXL+zyTiZYTxZWHTwN6asfIisDjblXESgidHGo9jV6gA0Zzx3PBMDaaZNw4ymBXnyr2VJu1uIlNnX1m7Mb8iSxUwQ/orWXoxx+W0Dgf6cFlK8XnzqgpzzmaDjc1b03u5kuFD8Aw>

# Cesium ImageryProvider,

- https://cesium.com/docs/cesiumjs-ref-doc/WebMapTileServiceImageryProvider.html

Dokazem to zintegrovat z vlasnym ? 

- https://www.geoportal.sk/sk/sluzby/mapove-sluzby/wmts/wmts-zbgis.html
- https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get?

- https://zbgis.skgeodesy.sk/zbgis/rest/services/DMR/MapServer/tile/16/22659/36097?blankTile=false

  <ResourceURL format="image/jpgpng" resourceType="tile" template="https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get/tile/1.0.0/WMS_zbgis_ortofoto_wmts/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}"/>



Ale stale dostavam 400 bad request od zbgis

- https://groups.google.com/forum/#!msg/osm_sk/jHpOq6-THII/fUmEKmq5DgAJ

Ale toto ide:

  https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get/tile/1.0.0/WMS_zbgis_ortofoto_wmts/default/default028mm/9/57295/54593

Sniff ?

- https://github.com/chimurai/http-proxy-middleware

Detour:

<https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get?> 
is signed by "CA Disig R2I2 Certification Service<-CA Disig Root R2"
and curl and gdal report invalid cert.

Kde je CA file na OSX ?
Ako exportnut a tam dostat CA Disig Root R2

### gdalinfo on WMTS

<https://gdal.org/drivers/raster/wmts.html>

  $ gdalinfo 'WMTS:https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get?'

WMTL terminologia, treba studovat:

  TileMatrixSet
  TileMatrix
  TileRow
  TileCol

  default028mm/9/57295/54593
  default028mm/10/114585/109192

<http://docs.opengeospatial.org/is/13-082r2/13-082r2.html>

Ale aj tak je to celen nanic lebo sa zda ze podpruju tiles WGS84
https://github.com/CesiumGS/cesium/issues/3877
a nie 

  Coordinate System is:
  PROJCS["S-JTSK / Krovak East North",
    GEOGCS["S-JTSK",
        DATUM["System_Jednotne_Trigonometricke_Site_Katastralni",
            SPHEROID["Bessel 1841",6377397.155,299.1528128,
                AUTHORITY["EPSG","7004"]],
            TOWGS84[589,76,480,0,0,0,0],
            AUTHORITY["EPSG","6156"]],
        PRIMEM["Greenwich",0,
            AUTHORITY["EPSG","8901"]],
        UNIT["degree",0.0174532925199433,
            AUTHORITY["EPSG","9122"]],
        AUTHORITY["EPSG","4156"]],
    PROJECTION["Krovak"],
    PARAMETER["latitude_of_center",49.5],
    PARAMETER["longitude_of_center",24.83333333333333],
    PARAMETER["azimuth",30.28813972222222],
    PARAMETER["pseudo_standard_parallel_1",78.5],
    PARAMETER["scale_factor",0.9999],
    PARAMETER["false_easting",0],
    PARAMETER["false_northing",0],
    UNIT["metre",1,
        AUTHORITY["EPSG","9001"]],
    AXIS["X",EAST],
    AXIS["Y",NORTH],
    AUTHORITY["EPSG","5514"]]


Cesium Projection System: <https://gis.stackexchange.com/questions/334002/cesium-projection-system>

--------------------------------------------------------------------

## 22.03.2020

## How to embed [Cesium] Viewer with my KML data ?
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

# Detour - studying CZML

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

[KML]: https://developers.google.com/kml
[CZML]: https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Guide

[OCG WMTKS]: https://www.ogc.org/standards/wmts

[dgal]: https://gdal.org/
[xmlstarlet]: http://xmlstar.sourceforge.net/


