# OSM Topics

## budovy

- building

ale pozor napriklad na toto: https://www.openstreetmap.org/way/233537021

a to je: tourism:wilderness_hut
ale bez building, preco ? ako to znacia "inde" ?
doplnil som building:yes

https://www.openstreetmap.org/way/749244919
building:ruins

typy:
polygony, body ?

building:garage - v okrese LM je len 942 garazi ? asi nie, vecsina vobec nie je oznacena

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


## calculating _surface

Surface nemusi byt vsade vyplneny, ani nebyva
skusme ho odhadnut podla inych atributov

https://wiki.openstreetmap.org/wiki/Key:highway#Roads

Roads: 

'motorway',
'trunk',
'primary',
'secondary',
'tertiary',
'unclassified',
'residential',

'motorway_link',
'trunk_link',
'primary_link',
'secondary_link',
'tertiary_link'



https://wiki.openstreetmap.org/wiki/Key:surface

Calculating OSM Surface

if(surface!='',
	surface,
	if(highway in (
		
		-- general
		
		'road',

		-- roads
		
		'motorway',
		'trunk',
		'primary',
		'secondary',
		'tertiary',
		'unclassified',
		'residential',

		-- links
		
		'motorway_link',
		'trunk_link',
		'primary_link',
		'secondary_link',
		'tertiary_link',

		-- service ?
		'service'
	),
	'asphalt',
	'UNKNOWN'
	)
)

 
	