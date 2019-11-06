const execSync = require('child_process').execSync;

const WHICH_NODE_BIN = process.argv[0];

const WHICH_NODE_HOME = WHICH_NODE_BIN.replace(/\/node$/g, '').replace(/\/bin$/g, '');

const WHICH_NODE_GYP = `${WHICH_NODE_HOME}/lib/node_modules/npm/bin/node-gyp-bin/node-gyp` ;

execSync(`${WHICH_NODE_GYP} configure`);

execSync(`${WHICH_NODE_GYP} build`);
