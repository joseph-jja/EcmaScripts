const baseDir = process.cwd(),
{
    clearScreen,
    clearMatrix,
    writeMatrix
} = require( `${baseDir}/src/server/terminal/matrix` ),
{
    horizontalSegment,
    verticleSegment
} = require( `${baseDir}/src/server/terminal/matrixDisplay` );


function writeSegment(sevenSegmentItem, segment) {

    let column = 1;
    if (sevenSegment > 0 && sevenSegment <=4) {
        column = sevenSegment;
    }
    let row = 1;
    switch (segment) {
      
    }

}
