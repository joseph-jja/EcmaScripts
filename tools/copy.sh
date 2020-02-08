#! /bin/sh

for FILES in `find "$BINARY_STELLAR_SYSTEM_HOME/js" -type f `; do

    FILE=`echo $FILES | awk -Fjs '{print $2}'`
    if [ -f js/"$FILE"js ] ; then 
        cp js/"$FILE"js "$BINARY_STELLAR_SYSTEM_HOME/js/"
    fi
done
