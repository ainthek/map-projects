#!/bin/bash

gpsbabel -i gpx -f "$1"  -x transform,trk=wpt -x nuketypes,waypoints -o gpx -F "$(dirname "$1")/$(basename "$1" .gpx).trk.gpx"