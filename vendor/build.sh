#!/bin/bash

#define paths
COMPILER=google-compiler/compiler.jar
BUILDPATH=../release/
MINIFIED="min"
PACKED="packed"
Lungo_SUGAR='lungo.sugar.'

#script
clear
echo -e "\033[0m"============================ QUOJS COMPILER ============================

#Simple Sugars
SUGARS=(growl language sound qr talk)
for file in "${SUGARS[@]}"
do
    echo -e "\033[32m  [BUILD]: lungo.sugar."$file".min.js\033[0m"
    java -jar $COMPILER --js ../$file/lungo.sugar.$file.js --js_output_file $BUILDPATH/lungo.sugar.$file.min.js
done

#GMap
SUGAR='gmap'
DIR=$Lungo_SOURCES"../"$SUGAR"/"$Lungo_SUGAR$SUGAR"."
FILES=(js interface.js route.js)
for file in "${FILES[@]}"
do
    FILES_TO_COMPILE=$FILES_TO_COMPILE" --js "$DIR$file
    FILES_TO_JOIN=$FILES_TO_JOIN" "$DIR$file
done

#MINIFIED Version
java -jar $COMPILER $FILES_TO_COMPILE --js_output_file $BUILDPATH/$Lungo_SUGAR$SUGAR.$MINIFIED.js
echo -e "\033[33m  [BUILD]: "$Lungo_SUGAR$SUGAR.$MINIFIED.js"\033[0m"

echo ============================ /QUOJS COMPILER ============================
