#!/bin/bash
 
pushd $1
 for f in $(ls *.png 2> /dev/null) 
 do 
   $2/concatresources.sh $f
 done
popd
