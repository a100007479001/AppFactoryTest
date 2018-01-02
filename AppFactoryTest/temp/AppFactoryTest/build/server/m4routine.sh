#!/bin/bash
echo "Hello World"
for i in $1/*.lua
do
	fname=$(basename $i)
	echo $fname
	m4 --undefine=len --undefine=format -D$3 $1/$fname >> $2/$fname
	echo "==================="
done
