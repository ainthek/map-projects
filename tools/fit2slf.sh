#!/bin/bash

## Convert specified files to slf (Sigma) files
## and renames the file based on date
# TODO: rewrite as node.js script

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

cp $TOOL/fit2gpx.ini ./fit2slf.ini

for file in "$@"
do
	outfile="$(dirname $file)/$(basename $file .fit).slf"
    # convert to gpx
    $TOOL/fit2slf.pl -y "$file" #
    
    # extract timestamp (REVIEW: differs from GPX)
    ts=$($TOOL/fitdump.pl -print_json=1 "$file" | JSONStream "file..session.timestamp" | jsontool 0 | slug | upper)
    # TODO: nicer, it is not part of gox, since it is not standard field ?
    desc=$($TOOL/fitdump.pl -print_json=1 "$file" | JSONStream "file..session.0_1_description" | jsontool 0 | slug)
    # rename, move to 
    renamed="$(dirname $outfile)/../slf/${ts}-${desc}-$(basename $outfile)"
    echo "$renamed"
    mv "$outfile" "$renamed"
    touch -t "$(format_date $ts)" "$renamed"

done

rm fit2slf.ini