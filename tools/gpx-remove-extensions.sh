#!/bin/bash

## Removes all tags others then frm gpx namespace
## Version: 0.1
## 
## Usage: 
##
## Samples:
##
##     /tools/gpx-remove-extensions.sh < ../gis-projects/data/suunto/converted/2020-04-04T15-23-03Z--5e8908149c2345565795a5df.gpx

if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" == 0 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi

# get current dir of script , absolute, one hop symlinks supported, XB OSX because readlink -f, see also https://gist.github.com/esycat/5279354
tools="$([ -L "$0" ] && BASHSOURCE="$(dirname "$0")/$(readlink "$0")" || BASHSOURCE="$0"; cd "$( dirname "$BASHSOURCE")" && pwd -P )"

$tools/xslt/xslt3 "$tools/xslt/gpx-remove-extensions.xslt" 
