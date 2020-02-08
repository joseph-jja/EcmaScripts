const baseDir = process.cwd(),
    {
        clearScreen,
        clearMatrix,
        writeMatrix
    } = require( `${baseDir}/src/server/terminal/matrix` ),
    {
        digits,
        setColon
    } = require( `${baseDir}/src/server/terminal/digits` );


clearScreen();
clearMatrix();

let now = new Date();

let hours = `${now.getHours()}`.padStart( 2, 0 );
let minutes = `${now.getMinutes()}`.padStart( 2, 0 );

digits( 1, +hours.substring( 0, 1 ) );
digits( 2, +hours.substring( 1 ) );
digits( 3, +minutes.substring( 0, 1 ) );
digits( 4, +minutes.substring( 1 ) );
setColon();

writeMatrix();

//setTimeout(() => {
setInterval( () => {
    clearMatrix();

    now = new Date();
    hours = `${now.getHours()}`.padStart( 2, 0 );
    minutes = `${now.getMinutes()}`.padStart( 2, 0 );

    digits( 1, +hours.substring( 0, 1 ) );
    digits( 2, +hours.substring( 1 ) );
    digits( 3, +minutes.substring( 0, 1 ) );
    digits( 4, +minutes.substring( 1 ) );
    setColon();

    writeMatrix();

}, 1000 );
