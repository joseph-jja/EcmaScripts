const baseDir = process.cwd(),
    {
        numberWidth,
        numberHeight,
        segmentHeight,
        clearScreen,
        clearMatrix,
        writeMatrix
    } = require(`${baseDir}/src/server/terminal/matrix`);

function horizontalSegment(row, colStart) {

    const idx = ((colStart - 1) * numberWidth);
    const offset = (colStart === 1 ? 2 : (2 * colStart));
    let rowSet = (row === 1 ? row + 1 : ((row - 1) * (segmentHeight - 1)));
    if (row === 3) {
        rowSet -= 2;
    }
    for (let i = 0; i < numberWidth; i++) {
        matrix[rowSet][idx + i + offset] = '*';
    }
}

function verticleSegment(rowStart, col, startEnd = 0) {

    const idx = ((col - 1) * numberWidth);
    let offset = (col === 1 ? 2 : (2 * col));
    offset = (startEnd === 0 ? offset : offset + numberWidth - 1);
    const rowSet = (rowStart === 1 ? rowStart + 1 : ((rowStart - 1) * (segmentHeight - 1))) - 1;
    for (let i = 1; i < segmentHeight - 1; i++) {
        matrix[rowSet + i][idx + offset] = '*';
    }
}

module.exports = {
    horizontalSegment,
    verticleSegment
};