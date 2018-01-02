PUSHD %1
FOR /F "delims=." %%A  in ('dir /b *.png') do convert %%A.png %%A.bmp
del *.png
ren *.bmp *.png
POPD
GOTO:EOF