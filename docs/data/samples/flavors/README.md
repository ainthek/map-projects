# Various flavors and transformations

# gpx-trk-garmin.gpx

Structure:

	gpx/trk/trkseg
	gpx/trk/trkseg/trkpt
	gpx/trk/trkseg/trkpt/ele
	gpx/trk/trkseg/trkpt/time

## Transforming with gdal to KML, it will produce KML with 4 folders:

	$ ogr2ogr -f KML /vsistdout/ docs/data/samples/flavors/gpx-trk-garmin.gpx 

	<Folder><name>waypoints</name>
	<Folder><name>routes</name>
	<Folder><name>route_points</name>

	<Folder><name>tracks</name> 		// one  Placemark with Geometry with Line with 2D coordinates 
	<Folder><name>track_points</name>	// many Placemark with Geometry Point with 2D coordinates

### waypoints,routes,route_points

Are empty:

	<Folder><name>waypoints</name></Folder>
    <Folder><name>routes</name></Folder>
    <Folder><name>route_points</name></Folder>

### tracks 

Contains one Placemark with Geometry with Line with 2D coordinates 
Elevation and Time info is lost.

	<Folder>
      <Placemark>
        <MultiGeometry>
          <LineString>
            <coordinates>
				17.1443313360214,48.1994058005512 
				17.1441652905196,48.1986905727535 
				17.1441324334592,48.1986629962921
			</coordinates>
          </LineString>
        </MultiGeometry>
      </Placemark>
    </Folder>
    
### track_points

Contains several Placemark with geometry Point with 2D coordinates
Other data saved as ExtendedData (still incorrectly)

	<Folder><name>track_points</name>
      <Placemark>
        <ExtendedData>
          <SchemaData schemaUrl="#track_points">
            <SimpleData name="track_fid">0</SimpleData>
            <SimpleData name="track_seg_id">0</SimpleData>
            <SimpleData name="track_seg_point_id">0</SimpleData>
            <SimpleData name="ele">193.800003051758</SimpleData>
            <SimpleData name="time">2020/03/26 14:27:00+00</SimpleData>
            <SimpleData name="ns3_TrackPointExtension">&lt;ns3:atemp&gt;19.0&lt;/ns3:atemp&gt;            &lt;ns3:hr&gt;106&lt;/ns3:hr&gt;            &lt;ns3:cad&gt;44&lt;/ns3:cad&gt;          </SimpleData>
          </SchemaData>
        </ExtendedData>
        <Point>
          <coordinates>17.1443313360214,48.1994058005512</coordinates>
        </Point>
      </Placemark>
      <Placemark>
        <ExtendedData>
          <SchemaData schemaUrl="#track_points">
            <SimpleData name="track_fid">0</SimpleData>
            <SimpleData name="track_seg_id">0</SimpleData>
            <SimpleData name="track_seg_point_id">1</SimpleData>
            <SimpleData name="ele">194.199996948242</SimpleData>
            <SimpleData name="time">2020/03/26 14:27:24+00</SimpleData>
            <SimpleData name="ns3_TrackPointExtension">&lt;ns3:atemp&gt;19.0&lt;/ns3:atemp&gt;            &lt;ns3:hr&gt;103&lt;/ns3:hr&gt;            &lt;ns3:cad&gt;44&lt;/ns3:cad&gt;          </SimpleData>
          </SchemaData>
        </ExtendedData>
        <Point>
          <coordinates>17.1441652905196,48.1986905727535</coordinates>
        </Point>
      </Placemark>
      <Placemark>
        <ExtendedData>
          <SchemaData schemaUrl="#track_points">
            <SimpleData name="track_fid">0</SimpleData>
            <SimpleData name="track_seg_id">0</SimpleData>
            <SimpleData name="track_seg_point_id">2</SimpleData>
            <SimpleData name="ele">194.399993896484</SimpleData>
            <SimpleData name="time">2020/03/26 14:27:25+00</SimpleData>
            <SimpleData name="ns3_TrackPointExtension">&lt;ns3:atemp&gt;19.0&lt;/ns3:atemp&gt;            &lt;ns3:hr&gt;105&lt;/ns3:hr&gt;            &lt;ns3:cad&gt;44&lt;/ns3:cad&gt;          </SimpleData>
          </SchemaData>
        </ExtendedData>
        <Point>
          <coordinates>17.1441324334592,48.1986629962921</coordinates>
        </Point>
      </Placemark>
    </Folder> 

## Transforming with GPSvisualizer
<https://www.gpsvisualizer.com/map_input?form=googleearth>

With default options:


	<?xml version="1.0" encoding="utf-8" standalone="yes"?>
	<kml xmlns="http://www.opengis.net/kml/2.2">
	  <Document>
	    <name><![CDATA[gpx-trk-garmin]]></name>
	    <visibility>1</visibility>
	    <open>1</open>
	    <Snippet><![CDATA[created using <a href="https://www.gpsvisualizer.com/?ref=ge&time=20200327050046">GPS Visualizer</a>]]></Snippet>
	    <Folder id="Tracks">
	      <name>Tracks</name>
	      <visibility>1</visibility>
	      <open>0</open>
	      <Placemark>
	        <name><![CDATA[Bratislava Horské bicyklovanie]]></name>
	        <Snippet></Snippet>
	        <description><![CDATA[&nbsp;]]></description>
	        <Style>
	          <LineStyle>
	            <color>ff0000e6</color>
	            <width>4</width>
	          </LineStyle>
	        </Style>
	        <LineString>
	          <tessellate>1</tessellate>
	          <altitudeMode>clampToGround</altitudeMode>
	          <coordinates>17.144331336,48.199405801,193.8 17.144165291,48.198690573,194.2 17.144132433,48.198662996,194.4 </coordinates>
	        </LineString>
	      </Placemark>
	    </Folder>
	  </Document>
	</kml>

Struktura je:

	Folder/Placemark/LineString/coordinates a coordinates su 3D

a gdal mal:

	Folder/Placemark/MultiGeometry/LineString/coordinates a coordinates su 2D


