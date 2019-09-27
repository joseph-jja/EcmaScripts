const baseDir = process.cwd(),
    {
        clearScreen,
        clearMatrix,
        writeMatrix
    } = require(`${baseDir}/src/server/terminal/matrix`),
    {
        horizontalSegment,
        verticleSegment
    } = require(`${baseDir}/src/server/terminal/matrixDisplay`);


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
    sevenSegment
}
