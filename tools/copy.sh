#! /bin/sh

for FILES in `find "$BINARY_STELLAR_SYSTEM_HOME/js" -type f `; do

    FILE="js`echo $FILES | awk -Fjs '{print $2}' `js"
    echo $FILE 
    if [ -f "$FILE" ] ; then 
        cp "$FILE" "$BINARY_STELLAR_SYSTEM_HOME/js/"
    fi
done
