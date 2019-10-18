const baseDir = process.cwd(),
    {
        getNumberWidth,
        getNumberHeight,
        getSegmentHeight,
        setMatrixPoint,
        clearScreen,
        clearMatrix,
        writeMatrix
    } = require( `${baseDir}/src/server/terminal/matrix` );

const numberWidth = Math.floor( getNumberWidth() * 0.8 ),
    numberHeight = Math.floor( getNumberHeight() * 0.9 ),
    segmentHeight = Math.floor( getSegmentHeight() * 0.9 );

function getIndexOffset( cols ) {
    let idx = ( ( cols - 1 ) * numberWidth );
    if ( cols === 3 || cols === 4 ) {
        idx = ( ( cols - 1 ) * numberWidth ) + 8;
    }
    return Math.floor( idx * 1.4 );
}

function getOffset( colStart, startEnd = 0 ) {
    const idx = getIndexOffset( colStart );
    let offset = ( colStart === 1 ? 2 : ( 2 * colStart ) );
    offset = ( startEnd === 0 ? offset : offset + numberWidth - 1 );
    return offset + idx;
}

function horizontalSegment( row, colStart ) {

    const offset = getOffset( colStart, 0 );
    let rowSet = ( row === 1 ? row + 1 : ( ( row - 1 ) * ( segmentHeight - 1 ) ) );
    if ( row === 3 ) {
        rowSet -= 2;
    }
    for ( let i = 0; i < numberWidth; i++ ) {
        setMatrixPoint( rowSet, i + offset, '*' );
    }
}

function verticleSegment( rowStart, col, startEnd = 0 ) {

    const idx = getIndexOffset( col );
    let offset = getOffset( col, startEnd );
    const rowSet = ( rowStart === 1 ? rowStart + 1 : ( ( rowStart - 1 ) * ( segmentHeight - 1 ) ) ) - 1;
    for ( let i = 1; i < segmentHeight - 1; i++ ) {
        setMatrixPoint( rowSet + i, offset, '*' );
    }
}

module.exports = {
    getOffset,
    horizontalSegment,
    verticleSegment
};
