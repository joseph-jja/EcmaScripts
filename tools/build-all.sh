#! /bin/sh

npm run clean
npm run styles
npm run beautify 
npm run eslint
npm run build
sh tools/copy.sh
npm run test

