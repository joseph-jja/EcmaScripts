
if [ -d "$HOME/workspace/binary-stellar-system.github.io" ] ; then 
    export BINARY_STELLAR_SYSTEM_HOME=$HOME/workspace/binary-stellar-system.github.io/
else 
    if [ -d "$HOME/binary-stellar-system.github.io" ] ; then 
        export BINARY_STELLAR_SYSTEM_HOME=$HOME/binary-stellar-system.github.io/
    fi 
fi 
