# Converting jpeg images to png

import os
import shutil
import fnmatch
import Image
import argparse
import imghdr
import sys
def gen_find(filepat,top):
    for path, dirlist, filelist in os.walk(top):
        #print filelist
        for name in fnmatch.filter(filelist,filepat):
            path2 = path
            words = path2.split("/")
            fileName = words[len(words)-3]
            yield os.path.join(path,name)
# use
parser = argparse.ArgumentParser(description='Converting jpeg images to png')
parser.add_argument('-p', dest='dirpath',default='')
args = parser.parse_args()

if (args.dirpath == ''):
	src = os.path.normpath(os.getcwd() + os.sep + os.pardir)+"/res/drawable";
else:
	src = args.dirpath;
#input
#src='C:/Users/kh9260/Documents/pngConversion/abcd'
src=src.replace('\\','/')
filesToConvert = gen_find("*.jpg",src)
for name in filesToConvert:
    #shutil.copy(name, dst)
    name=name.replace('\\',"/")
    print(name+"  ")
    print ("Converting "+name+" from JPEG to PNG")
    im = Image.open(name)
    im.save(name[:-3]+"png")
