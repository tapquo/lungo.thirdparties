#!/bin/bash

#define paths
COMPILER=google-compiler/compiler.jar
BUILDPATH=../release/
MINIFIED="min"
PACKED="packed"

#script
clear
echo -e "\033[0m"============================ QUOJS COMPILER ============================
SUGARS=(growl language sound)
for file in "${SUGARS[@]}"
do
    echo -e "\033[32m  [BUILD]: lungo.sugar."$file".min.js\033[0m"
    java -jar $COMPILER --js ../$file/lungo.sugar.$file.js --js_output_file $BUILDPATH/lungo.sugar.$file.min.js
done
#Third-Parties
echo ============================ /QUOJS COMPILER ============================