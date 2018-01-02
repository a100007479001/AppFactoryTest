PUSHD %1
convert -size 106x50  xc:"rgba(%6,%7,%8, 1.0)"   color_rgba_1.png
convert -size 106x50  xc:"rgba(%3,%4,%5, 1.0)"   color_rgba_2.png
convert color_rgba_2.png[106x25+0+0] color_rgba_1.png[106x25+0+0] -append +repage %2.png
del color_rgba_1.png
del color_rgba_2.png
POPD
GOTO:EOF

rem PUSHD %1
rem convert -size 106x50 gradient:rgb(%3,%4,%5)-rgb(%6,%7,%8) %2.png
rem POPD
rem GOTO:EOF