#!/bin/bash
## Short purpose of the script
## Version:
## 
## Usage: 
##
## Samples:
##
##  clip-gpx.sh ../gis-projects/qgis/clips/koziarka-trail.shp  ../gis-projects/data/myTracks/2020-03-26\ 17_11_15.gpx 
##
##  
##

if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" == 0 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi

CLIP_SHP=$1
IN_GPX=$2


ogr2ogr -clipsrc "$CLIP_SHP" -dsco GPX_USE_EXTENSIONS=YES -f GPX /vsistdout/  "$IN_GPX" track_points #| xslt3 tools/xslt/gpx-only.xslt

