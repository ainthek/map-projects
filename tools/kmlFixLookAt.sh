#!/bin/bash

git-replace '<name>Points.kml</name>' "$1" '<name>Points.kml</name>' '<name>Points.fixed.kml</name>'
git-replace '<altitude>0</altitude>' "$1" '<altitude>0</altitude>' '<altitude>1000</altitude><altitudeMode>relativeToGround</altitudeMode>'
git-replace '<range>0</range>' "$1"  '<range>0</range>' '<range>1000</range>'
git-replace '<tilt>66</tilt>' "$1"  '<tilt>66</tilt>' '<tilt>0</tilt>'
