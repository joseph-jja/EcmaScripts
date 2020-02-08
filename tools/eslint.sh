#! /bin/sh 

DIR_FILES="*.js src tools tests config"
for FILES in $DIR_FILES; do 
    npx eslint --config config/eslint.json $FILES
done
