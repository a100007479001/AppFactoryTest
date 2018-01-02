 PUSHD %1
 FOR /F "delims=." %%A  in ('dir /b *.png') do %2/concatresources.bat %%A.png
 POPD
GOTO:EOF