#!/bin/bash

## Convert specified files to gpx files
## and renames the file based on date

if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" == 0 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi

# get current dir of script , absolute, one hop symlinks supported, XB OSX because readlink -f, see also https://gist.github.com/esycat/5279354
current="$([ -L "$0" ] && BASHSOURCE="$(dirname "$0")/$(readlink "$0")" || BASHSOURCE="$0"; cd "$( dirname "$BASHSOURCE")" && pwd -P )"
TOOL=$current/Garmin-FIT/

for file in "$@"
do
	outfile="$(dirname $file)/$(basename $file .fit).gpx"
    # convert to gpx
    $TOOL/fit2gpx.pl -y "$file" #
    
    # extract timestamp
    ts=$(cat "$outfile" | cheerio "metadata time" | slug | upper)
    # TODO: nicer, it is not part of gox, since it is not standard field ?
    desc=$($TOOL/fitdump.pl -print_json=1 "$file" | JSONStream "file..session.0_1_description" | jsontool 0 | slug)
    # rename, move to 
    renamed="$(dirname $outfile)/../gpx/${ts}-${desc}-$(basename $outfile)"
    echo "$renamed"
    mv "$outfile" "$renamed"
    

done