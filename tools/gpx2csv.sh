#!/bin/bash

## exports track_points from gpx as excel
## Version:
## 
## Usage: 
##
## Samples:
##  
##   /tools/gpx2csv.sh ../gis-projects/qgis/elevation-profiles/iPhoneGps.gpx
##    
if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" == 0 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi

IN=$1
OUT="$1.csv"

ogr2ogr -f CSV /vsistdout/ "$1" \
	-sql "SELECT time, ele, cast(track_seg_id as FLOAT), cast(track_seg_point_id AS FLOAT) from track_points" \
	-lco GEOMETRY=AS_XY \
	-lco SEPARATOR=TAB \
	-lco WRITE_BOM=YES | tee "$OUT"

echo 1>&2 "output: $OUT"
xlsx "$OUT"  --xlsx -o "$OUT.xlsx"

