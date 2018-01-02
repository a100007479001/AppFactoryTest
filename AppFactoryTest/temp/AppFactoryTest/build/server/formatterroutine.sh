#!/bin/bash
for i in $1/*.lua
do
fname=$(basename $i)
echo $fname $2 $1
./formatter -o $2/$fname $1/$fname
done
