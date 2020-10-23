Slovakia_JTSK03_to_JTSK.gsb

is digital datum shift model for horizontal coordinates transformation between JTSK03 and JTSK 
reference frames of S-JTSK coordinate refernce system in the territory of Slovakia.
Model is in a NTv2 format.

Transformation shift model involves the vectors of coordinate differences defined
in the plane JTSK03 on 684 identical points. It is the same set of identical points, which
has been used for the computation of the 7 Helmert transformation parameters of the global transformation key.
The computed coordinate differences characterize systematic non-homogeneity of the JTSK frame, but
do not aptly describe detailed non-homogeneity of lesser localities on cm level.
For purposes of the unambiguous definition of transformation relation between the JTSK03 and JTSK
frames it was necessary to express coordinate differences in the form of a regular grid and to define
the interpolation method. For this purpose the coordinate differences between JTSK03 and JTSK
in the shape of ellipsoidal coordinates on Bessell1841 ellipsoid for individual axes have been
interpolated by the Surfer software kriging method into a regular grid with a step 0.0168 deg (latitude) x 0.025 deg (longitude),
which was implemented to the Transformation service. To simplify the implementation of transformation between
the JTSK03 and JTSK frames to the GNSS and GIS software and receiver environments was created digital datum
shift model in NTv2 format.

Values in NTv2 grid represents S-JTSK (JTSK03) - S-JTSK (JTSK) differences on Bessel1841 elipsoid 
surface in degrees.						

For correct usage of those shift models always check your outputs with transformation service: https://zbgis.skgeodesy.sk/rts/en/Transform 

Source: https://www.geoportal.sk/en/geodetic-control/download/

License: CC BY, https://creativecommons.org/licenses/by/4.0/
Author: GKU Bratislava; year: 2013