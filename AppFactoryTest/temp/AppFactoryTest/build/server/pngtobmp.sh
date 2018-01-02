#!/bin/bash

export MAGICK_HOME=$2
export PATH=$2/bin:$PATH
export DYLD_LIBRARY_PATH=$2/lib
oldext=png
newext=bmp

pushd $1
for f in $(ls *.png) 
do 
echo $f
len=${#f}
echo $len
nfile=${f:0:len-4}
echo $nfile
convert $f $nfile.$newext
rm -f $f
mv $nfile.$newext $nfile.$oldext
done
popd
