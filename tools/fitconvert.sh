#!/bin/bash

## Convert specified files to gpx,slf (Sigma) and json (dump files) files
## renames the file based on date
## touches file 
##
## # Samples:
##     
##   
## Convert all files added "today":
##   find ../gis-projects/data/rides/suunto/fit/*.fit -maxdepth 1 -newermt "2021-01-01" | while read f; do ./tools/fitconvert.sh $f ; done 
if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" == 0 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi


format_date(){
   echo $1 | xs-sed "s;[TZ-];;g" | xs-sed "s;\(.*\)\([0-9][0-9]\);\1.\2;"
}

# get current dir of script , absolute, one hop symlinks supported, XB OSX because readlink -f, see also https://gist.github.com/esycat/5279354
current="$([ -L "$0" ] && BASHSOURCE="$(dirname "$0")/$(readlink "$0")" || BASHSOURCE="$0"; cd "$( dirname "$BASHSOURCE")" && pwd -P )"
TOOL=$current/Garmin-FIT/

cp $TOOL/fit2gpx.ini ./fit2gpx.ini
cp $TOOL/fit2gpx.ini ./fit2slf.ini

for fit in "$@"
do
    echo 1>&2 "Processing $fit"
    json="$(dirname $fit)/$(basename $fit .fit).json"
    gpx="$(dirname $fit)/$(basename $fit .fit).gpx"
    slf="$(dirname $fit)/$(basename $fit .fit).slf"
    
    $TOOL/fitdump.pl -print_json=1 "$fit" > "$json"
    $TOOL/fit2gpx.pl -y "$fit" #$gpx
    $TOOL/fit2slf.pl -y "$fit" #slf
    
    # extract timestamp, somehow it is calculated in gpx (TODO: how ?)
    ts=$(cat "$gpx" | cheerio "metadata time" | slug | upper)
    desc=$(cat "$json" | JSONStream "file..session.0_1_description" | jsontool 0 | slug)
    
    dest="$(dirname $fit)/../converted"
    json2="$dest/${ts}-${desc}-$(basename "$json")"
    gpx2="$dest/${ts}-${desc}-$(basename "$gpx")"
    slf2="$dest/${ts}-${desc}-$(basename "$slf")"
    fit2="$dest/${ts}-${desc}-$(basename "$fit")"
    
    mv "$json" "$json2"
    mv "$gpx" "$gpx2"
    mv "$slf" "$slf2"
    cp "$fit" "$fit2"

    touch -t "$(format_date $ts)" "$fit"
    touch -t "$(format_date $ts)" "$json2"
    touch -t "$(format_date $ts)" "$gpx2"
    touch -t "$(format_date $ts)" "$slf2"
    touch -t "$(format_date $ts)" "$fit2"

done

rm ./fit2gpx.ini ./fit2slf.ini
