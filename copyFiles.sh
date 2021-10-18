#! /bin/sh

if [ "$BINARY_STELLAR_SYSTEM_HOME" == "" ]; then
    echo "BINARY_STELLAR_SYSTEM_HOME not set"
    exit 0
fi

for FILE in `ls $BINARY_STELLAR_SYSTEM_HOME/js ` ; do
    if [ -f "js/$FILE" ]; then 
        echo "js/$FILE"
        cp "js/$FILE" "$BINARY_STELLAR_SYSTEM_HOME/js/"
    fi
done

