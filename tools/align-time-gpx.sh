#!/bin/bash

## Short purpose of the script
## Version:
## 
## Usage: 
##
## Samples:
##	align-time-gpx 2020-03-15T12:08:55 03-rider1.selected-points.wpt.gpx    

if [ "$1" == "-h" ] || [ "$1" == "--help" ] || ([ -t 0 ] && [ "$#" != 2 ])
then 
	perl -ne "/^## ?/ && s/^## ?//g && print" "${BASH_SOURCE[0]}"
	exit 1
fi

# get current dir of script , absolute, one hop symlinks supported, XB OSX because readlink -f, see also https://gist.github.com/esycat/5279354
current="$([ -L "$0" ] && BASHSOURCE="$(dirname "$0")/$(readlink "$0")" || BASHSOURCE="$0"; cd "$( dirname "$BASHSOURCE")" && pwd -P )"

xmlstarlet fo "$2" | node "$current/align-time.js" time "$1" | xmlstarlet fo