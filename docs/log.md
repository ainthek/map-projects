# Work Log

## 2.4.2020

Comparing elevation profiles continued



## 1.4.2020

New toy , suunto spartan watch, new problems FIT format.

### Fit2gpx
- <https://www.gpsvisualizer.com/>

### Compare myTrack recording with Suntoo recording

### Split based on elevation gain (uphils, flats, downhgils)
- <https://gis.stackexchange.com/questions/259697/split-a-vector-layer-based-on-attribute-value>

### Topics
- !!! Add Raster Values to Point !!!
- Climb along line
- vector_attribute_data <https://docs.qgis.org/3.4/en/docs/gentle_gis_introduction/vector_attribute_data.html>
- Split vector layer <https://gis.stackexchange.com/questions/259697/split-a-vector-layer-based-on-attribute-value>

Tools: 

- https://www.potter.ca/Biking/smoother/gpxsmoother.html
- http://www.trackreport.net/

- Virtual Terrain Project http://vterrain.org/

## nesedia kopce

WKT
PROJCS["S-JTSK / Krovak East North",
  GEOGCS["S-JTSK",
    DATUM["System_Jednotne_Trigonometricke_Site_Katastralni",
      SPHEROID["Bessel 1841",6377397.155,299.1528128,AUTHORITY["EPSG","7004"]],
      TOWGS84[589,76,480,0,0,0,0],
      AUTHORITY["EPSG","6156"]],
      PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],
      UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4156"]],
      PROJECTION["Krovak"],
      PARAMETER["latitude_of_center",49.5],
      PARAMETER["longitude_of_center",24.83333333333333],
      PARAMETER["azimuth",30.28813972222222],
      PARAMETER["pseudo_standard_parallel_1",78.5],
      PARAMETER["scale_factor",0.9999],
      PARAMETER["false_easting",0],
      PARAMETER["false_northing",0],
      UNIT["metre",1,AUTHORITY["EPSG","9001"]],
      AXIS["X",EAST],AXIS["Y",NORTH],
      AUTHORITY["EPSG","5514"]]
Proj4
+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=542.5,89.2,456.9,5.517,2.275,5.516,6.96 +pm=greenwich +units=m +no_defs
Extent
12.09, 47.73, 22.56, 51.06


## 30.03.2020

Playing with Strava Segments.

- using strava API, donwloading Segments
- decoding segments from Encoded Polyline Algorithm Format <https://developers.google.com/maps/documentation/utilities/polylinealgorithm>
- segment to GPX

  curl \
  -H "Authorization: Bearer ${YOURACCESSTOKEN}" \
  -X GET \
  https://www.strava.com/api/v3/segments/explore?bounds=47.9973%2C16.7871%2C48.2722%2C17.4435


  curl \
  -H "Authorization: Bearer ${YOURACCESSTOKEN}" \
  -X GET \
  https://www.strava.com/api/v3/segments/explore?bounds=48.1921%2C17.0990%2C48.2092%2C17.1400


  curl -H "Authorization: Bearer ${YOURACCESSTOKEN}" -X GET https://www.strava.com/api/v3/segments/7363237 | jsontool

Result:

  mame tooling segment2gpx ;-)

  // https://www.npmjs.com/package/strava-v3
  // https://www.npmjs.com/package/xmlbuilder2
  // review: https://stackoverflow.com/questions/49075631/xml-stream-writer-library-in-node-js


## 28.03.2020

naive disk base geospacial serach ;-)))

  ls -ld -1 ../gis-projects/data/others/runtastic-marcus/rides-exports/export-20200206-000/Sport-sessions/GPS-data/*.gpx | while read f; do ./tools/clip/clip-gpx.sh ../gis-projects/qgis/clips/krasnansky-trail-original.shp $f > test/$(basename $f); done
  grep -c trkpt test/*.gpx | grep -v ":0$" | cut -d":" -f1 | while read f; do cp ../gis-projects/data/others/runtastic-marcus/rides-exports/export-20200206-000/Sport-sessions/GPS-data/$(basename $f) test/krasnansky-trail-original/; done

## 27.03.2020

<https://github.com/CesiumGS/cesium/issues/873> toto som zareportoval:

  Hi there I hace palyed more with the KMLs based on your samples
  and have another issue

  Let's have 4 points and 2 flavors of KML, one as LineString and one as gx:Track

  LineString works 

    https://sandcastle.cesium.com/index.html#c=bVRtT9swEP4rVr80lTKn6XipSgjTQOzDQCC12j4skzDOtbVw7Mh2Wgriv++cN1pYVTW95557vwvXyjqyEbAFQ86Jgi25BCuqgv6qsWDIa/FSK8eEAjMMyWumCHFgDAL3Rm9EDmbWmXEDzMFvbWS+aCjBKMzU2+gsUxtmiC6dwJgY65V4P4RwVoBhZNZmQS0HBbRBw56DxvYzx6NhS5GsKBf6h9GVymfEmQow7Blpwr5oXSyYWYHrkKdCYhIPycUz/tmAsZjWeTaI6TgbEFBc50KtEKjc8ss0G1ykmUq8DdKVRXztXDmLou12S3UJaiUsVeAipEQTOkEfNXG2ej7krrReSUxdFzUVnl1DT30Vyb1kHApmntKmqERhG9LbHbnB3idRLbWaHCw3ou5mulgLS/Dr1kCk5syDRC9JscPfpeBAk2if37rwTufOYJ0tgpgDa0FKnGEaJ9Ge1DOYdMJVOdzqHNKDrifRga634Fob7CZ6sWl8SuPJeHI8DY+mdBKPj04npMHGxw0Un8YnLRR/Peow1DefuNVNev7J9DiJ9mP0gaMPFSbRfoMTPwF8PrSrWTJj+yu4uru9r+Wg29zS6EJYQH276j8LecUcm+vKYIelZnnQuKD14xr5TewA4+AmD5yfNq5FNhiF3SGM/D62DrdrUEEbJiTLSnFPCfI+yKg/mvYO3lWWsjzfp561zPfNx8zf9RQUjkqg3YbJCuyf8V9v8VbbZWrOVM6Zdbiq6HehtXxk5nvlHOYzvJY74jTpezncS/ZTiku5W+iuqtFZFFHny0Tiefp/Tp3CW0iGrgk7RGAQDhLrdrLbqm+iKLVxpDIyoBT3tCj9ltroseJP4Ci31s8tiTqjJBcbInI8xg8vNLxUXGLrT3pZSTkXL4DXiPciNgdmfr44yzt8VUi285R1nN40IKV4YCh+tmpL2PP4Dw

  gx:Track, "banner" is OK but "track line" is underground

    https://sandcastle.cesium.com/index.html#c=jVX7b9s2EP5Xbv7FNuBQjzzhKOq2Fu2GNU1QCxuwaUAZ6WwToUiDpOy4Rf73HfWKs3RYBMIy777v7vj4ToVW1sFW4A4NXIHCHbxFK+qK/d7YJuOimb7VynGh0Ixn8C1XAEEA2S+/LsCP69ubz9lPnzL4AbiUYBErCwa5RFeC0+DQGCLDHYqVAk3s5vFhOtet0VtRopn32QuiO/xDG1lmLWQyneXqcXqZqy03oDdOUOlU8rcmDkDBKzQc5t1imC1QIWutswFDZPsS462zDiJ5tcn0B6NrVc7BmRop7SW0ab9qXWXcrND1lvtKUhFfkjcP9GeLxlJZV/koYmE+AlSFLoVakaF2y6OLfPQmzVXiOQRXluxr5zbzINjtdkxvUK2EZQpdQJAgZjHFaIDz1cNz7ErrlaTSddVA8cG18NSvIrmVvMCKm/u0XVSiaBvS6z18pCNMgmbWeUq0hRHNbqbZWlig4dYIUhfcG0EvodrT71IUyJLgEN+FWD3MM8OLPhlZHFqLUtIJplESHMwGBJdOuLrEa11i+mzPk+CZb2Ds1qjSOIzOjsLjo+Mwi47n0SmNP5Ogcf0f8PyVwDh8DTAOvweknSi0NmUanbMoDuPTCzi5YHEUnpzHSTB4/wsfnrbw6Dw6ewU8Oj7p8cRtn+gVvHjIc3Zx+gLfGJ7OMwkOL1Pibxu9v3Qy3HBjh8bx7ub6tplPepVujK6ERfJ3sv6tku+44wtdG7pNUvNy0oZgzes94RfOkGImlIdUO3L+ZpME8tF01ot+6rXXBfT7P+nSzGBZq8JDJuWQZDo0iE7zTy7LeFkeQi875JPKqfInP0NFF1MQb8tljfav8G/PeGx4uVpwVRbcOpIlxc20lnfc/Fw7R/WM38u974TDXo4Pin1R4lLuM92vasqcXyOhrtLvA5r8jzMYuzbnmAyj2Sixbi97Af0oqo02DmojJ4yRJKuNF6QN7uriHh0rrPWHlgQ9KSnFFkRJXedfHwBqSaRX63vXspZyIb4itR1qDGL7jOYPlw7yhnqi5HsPWUfpx9bIGHUSmr5kdUs4iPgP
   
  When no terraiin is specified, also gx:Track works
    
    https://sandcastle.cesium.com/index.html#c=jZX7b9s2EMf/lZt/sQ041CNPOIq6rUW7YU0T1MIGbBpQRjrbRCjSICk7bpH/fUe94iwdFkOwzOPnHnx8z4VW1sFW4A4NXIHCHbxFK+qK/d7YJuOiGb7VynGh0Ixn8C1XAEEA2S+/LsA/17c3n7OfPmXwA3ApwSJWFgxyia4Ep8GhMeQMdyhWCjR5N582TDd5a/RWlGjmff6CAjj8QxtZZi0ymc5y9Ti9zNWWG9AbJ6h4KvpbEwmg4BUaDvNuOcwWqJC11tnAkLN9yXjrrEMkrzaZ/mB0rco5OFMjpb2ENu1XrauMmxW63nJfSSriS/LmgX5s0Vgq6yofRSzMR4Cq0KVQKzLUbnl0kY/epLlKvA/hypJ97dxmHgS73Y7pDaqVsEyhCwgJYhZTjAacrx6esyutV5JK11WD4oNr8dSvIrmVvMCKm/u0XVSiaBvS6z18pENMgmbUzZRoCyOa3UyztbBAj1sjSF1wbwS9hGpP30tRIEuCQ74LsXqYZ4YXfTKyOLQWpaQTTKMkOBgNBJdOuLrEa11i+mzPk+DZ3OCxW6NK4zA6OwqPj47DLDqeR6f0/JkEzdT/geevBOPwNWAcfg+knSi0NmUanbMoDuPTCzi5YHEUnpzHSTDM/hcfnrZ4dB6dvQKPjk96nnzbT/QKv3jIc3Zx+oJvDE/nmQSHlynxt43eXzoZbrixQ+t4d3N924wnvUo3RlfCIs13sv6tku+44wtdG7pNUvNy0oZgzes98QtnSDETykOqHTl/s0kC+Wg660U/9drrAvr9n3RpZrCsVeGRSTkkmQ4NotP805RlvCwP0cuOfFI5Vf40z1DRxRTkt+WyRvtX+Lf3eGz8crXgqiy4dSRLiptpLe+4+bl2juoZv5d73wuHvRwfFPuixKXcZ7pf1ZQ5v0airtLvA03+xxmMXZtzTIbRbJRYt5e9gH4U1UYbB7WRE8ZIktXGC9IGd3Vxj44V1vpDS4LeKSnFFkRJXedffwHUkkiv1veuZS3lQnxFajvUGMT2mZs/XDrIG+qJku89so7Sj62RMeokNHzp1S3hIOI/

  How to fix samples to make gx:Track and their respecitive lines to work with terrainProvider ON ?

  Thanx a lot

------------------------------

Cesium from Sources Development:

  - https://stackoverflow.com/questions/31186819/what-is-the-lightest-possible-method-of-using-cesium
  - https://blog.isquaredsoftware.com/2017/03/declarative-earth-part-1-cesium-webpack/
  - https://github.com/CesiumGS/cesium-webpack-example/tree/master/src

-------------------------------

## 26.03.2020

Playing with xslt and xml tools

Removing all tags from other than GPX namespace:

  data/samples/animated/2Tracks/02-rider2.selected-points.gpx  
  tools/xslt/gpx-only.xslt


Napespaces in GPS files:

  xmlns="http://www.topografix.com/GPX/1/1"

Links:
  - xslt-30 <https://www.w3.org/TR/xslt-30/>
  - JXON <https://developer.mozilla.org/en-US/docs/Archive/JXON#The_Parker_Convention>  

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

Debugging KML building for LIne and track

Track: JSON.stringify(coordinates)
  
  "[
    {
      "x": 4069607.90135563,
      "y": 1253550.1027781987,
      "z": 4732503.934593956
    },
    {
      "x": 4069513.8855786445,
      "y": 1253504.9681603748,
      "z": 4732596.113307932
    },
    {
      "x": 4069511.730902964,
      "y": 1253510.8367535013,
      "z": 4732596.409698932
    }
  ]"

  "[
  {
    "x": 4069607.90135563,
    "y": 1253550.1027781987,
    "z": 4732503.934593956
  },
  {
    "x": 4069513.8855786445,
    "y": 1253504.9681603748,
    "z": 4732596.113307932
  },
  {
    "x": 4069511.730902964,
    "y": 1253510.8367535013,
    "z": 4732596.409698932
  }
]"

_value: Array(4)
0: Cartesian3 {x: 4069607.90135563, y: 1253550.1027781987, z: 4732503.934593956}
1: Cartesian3 {x: 4069513.8855786445, y: 1253504.9681603748, z: 4732596.113307932}
2: Cartesian3 {x: 4069511.730902964, y: 1253510.8367535013, z: 4732596.409698932}
3: Cartesian3 {x: 4069512.950766929, y: 1253516.7338429564, z: 4732593.816276912}
length: 4


## 23.03.2020

Treba sa pohrat z customizaciu viewera, 
kedze vcera som zistil ze veci v [sandcastle] chodia a v [Cesium Viewer] nie.

- https://cesium.com/blog/2019/10/31/cesiumjs-es6/
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


