const cols = process.stdout.columns,
    rows = process.stdout.rows;

const numberWidth = Math.floor(cols / 4) - 4,
    numberHeight = Math.floor(rows - 4),
    segmentHeight = Math.floor(numberHeight / 2) - 1;

const matrix = [];

function clearScreen() {
    for (let i = 0; i < rows; i++) {
        console.log('');
    }
}

function clearMatrix() {

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = ' ';
        }
    }
}

function writeMatrix() {

    for (let i = 0; i < rows; i++) {
        let line = '';
        for (let j = 0; j < cols; j++) {
            line += matrix[i][j];
        }
        console.log(line);
    }
}

module.exports = {
    getNumberWidth: () => {
        return numberWidth
    },
    getNumberHeight: () => {
        return numberHeight
    },
    getSegmentHeight: () => {
        return segmentHeight
    },
    setMatrixPoint: (x, y, value) => {
        matrix[x][y] = value
    },
    clearScreen,
    clearMatrix,
    writeMatrix
};
