const x = require('./build/Release/binaryDB');

console.log('IN /templateResolver?urlPath=%2f2f&hash=1234');
console.log(x.splitHash('/templateResolver?urlPath=%2f2f&hash=1234'));

console.log('IN /templateResolver?urlPath=%2f2f');
console.log(x.splitHash('/templateResolver?urlPath=%2f2f'));

console.log('IN /templateResolver?urlPath=%2f2f&hash=1234&channel=us');
console.log(x.splitHash('/templateResolver?urlPath=%2f2f&hash=1234&channel=us'));
