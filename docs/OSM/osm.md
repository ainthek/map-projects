# OSM Topics

## Interesting objects

### boundary:national_park
### boundary:protected_area
### building

### route=bicycle
Cycle routes or bicycle route are named or numbered or otherwise signed routes. They may go along roads, trails or dedicated cycle paths.
<https://wiki.openstreetmap.org/wiki/Tag:route%3Dbicycle>

### route=mtb
MTB (Mountain bike) routes are named or numbered or otherwise signed routes, designated for mountain biking. They may go along roads, trails or dedicated cycle paths, or a combination of these.
<https://wiki.openstreetmap.org/wiki/Tag:route%3Dmtb>

## Building OSM maps for bike

Query:

	<osm-script output="xml" timeout="25">
	  <union>
	    <query type="relation">
	      <has-kv k="route" v="mtb" />
	      <bbox-query {{bbox}} />
	    </query>
	    <query type="relation">
	      <has-kv k="route" v="bicycle" />
	      <bbox-query {{bbox}} />
	    </query>
	  </union>
	  <union>
	    <item />
	    <recurse type="down" />
	  </union>
	  <print mode="body" />
	</osm-script>
	