const baseDir = process.cwd(),
    fs = require('fs'),
    {
        promisify
    } = require('util');

const readdir = promisify(fs.readdir),
    stats = promisify(fs.stat);

async function basefiles() {

    const files = Array.from(await readdir(baseDir)).filter(file => {
        return (file.substring(file.length - 3) === '.js');
    });

    return files;
}

async function walkDir(dir) {

    const files = Array.from(await readdir(dir)).map(file => {
        return `${dir}/${file}`;
    }).forEach(async (file) => {
        const isDir = await stats(file);
        if (isDir.isFile()) {
            console.log(file);
        } else {
            walkDir(file);
        }
    });
    //return (file.substring(file.length - 3) === '.js' ||
    //   file.substring(file.length - 5) === '.json');
}

//basefiles();
walkDir(`${baseDir}/tests`);