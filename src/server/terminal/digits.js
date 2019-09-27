const baseDir = process.cwd(),
    {
        sevenSegment,
        setColon
    } = require(`${baseDir}/src/server/terminal/sevenSegment`);

function one(index) {
    sevenSegment(index, 3);
    sevenSegment(index, 7);
}

function two(index) {
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 4);
    sevenSegment(index, 5);
    sevenSegment(index, 6);
}

function three(index) {
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 4);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function four(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 3);
    sevenSegment(index, 4);
    sevenSegment(index, 7);
}

function five(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 2);
    sevenSegment(index, 4);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function six(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 2);
    sevenSegment(index, 4);
    sevenSegment(index, 5);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function seven(index) {
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 7);
}

function eight(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 4);
    sevenSegment(index, 5);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function nine(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 4);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function zero(index) {
    sevenSegment(index, 1);
    sevenSegment(index, 2);
    sevenSegment(index, 3);
    sevenSegment(index, 5);
    sevenSegment(index, 6);
    sevenSegment(index, 7);
}

function digits(index, num) {

    switch (num) {
        case 1:
            one(index);
            break;
        case 2:
            two(index);
            break;
        case 3:
            three(index);
            break;
        case 4:
            four(index);
            break;
        case 5:
            five(index);
            break;
        case 6:
            six(index);
            break;
        case 7:
            seven(index);
            break;
        case 8:
            eight(index);
            break;
        case 9:
            nine(index);
            break;
        case 0:
            zero(index);
            break;
        default:
            break;
    }
}

module.exports = {
    digits,
    setColon
};
