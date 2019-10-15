const baseDir = process.cwd(),
    {
        clearScreen,
        clearMatrix,
        writeMatrix
    } = require(`${baseDir}/src/server/terminal/matrix`),
    {
        getNumberWidth,
        getNumberHeight,
        getSegmentHeight,
        setMatrixPoint
    } = require(`${baseDir}/src/server/terminal/matrix`),
    {
        getOffset,
        horizontalSegment,
        verticleSegment
    } = require(`${baseDir}/src/server/terminal/matrixDisplay`);

function setColon() {

    const leftMax = getOffset(2, 1),
        rightMin = getOffset(3);

    const row = Math.floor(getSegmentHeight() / 2) + 1;

    const col = leftMax + Math.floor((rightMin - leftMax) / 2);

    setMatrixPoint(row, col, '*');
    setMatrixPoint(row + row, col, '*');
}

function sevenSegment(sevenSegmentItem, segment) {

    let column = 1;
    if (sevenSegmentItem > 0 && sevenSegmentItem <= 4) {
        column = sevenSegmentItem;
    }
    let row = 1;
    switch (segment) {
        case 1:
            verticleSegment(1, column, 0);
            break;
        case 2:
            horizontalSegment(1, column);
            break;
        case 3:
            verticleSegment(1, column, 1);
            break;
        case 4:
            horizontalSegment(2, column);
            break;
        case 5:
            verticleSegment(2, column, 0);
            break;
        case 6:
            horizontalSegment(3, column);
            break;
        case 7:
            verticleSegment(2, column, 1);
            break;
        default:
            break;
    }
}

module.exports = {
    sevenSegment,
    setColon
}
