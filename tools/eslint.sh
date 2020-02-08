#! /bin/sh

DIR_FILES = "*.js src tools tests config"
for FILES in $DIR_FILES; do
    #for ALL_FILES in `find $FILES -type f`; do 
    #    npx js - beautify--config config / js - beautify.json - r $ALL_FILES
    #done
    npx eslint--config config / eslint.json $FILES
done
