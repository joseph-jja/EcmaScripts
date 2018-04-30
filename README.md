# EcmaScripts with test coverage varies but threshold is about 50% on files that have tests

* using es6 and babel this will be some scripts for my personal website
* all tests are done in jasmine 2 with karma, webpack, and babel 
* may use nodejs to render server side data
* may use handlebars as templating or simple strings TBD

### Flow
* write modules in es6 in src dir
* write tests in es6 in tests dir

#### commands
* npm run clean 
 * remove npm-debug.log
 * remove work directory 
 * remove js directory 
* npm run build
 * gulp is used to beautify js files, test files, config files and run eslint on test files
 * webpack runs eslint and babel and creates js directory with output files 
* npm run tests
 * runs all the tests
 * karma + webpack + babel + jasmine for tests

## TODO
* fix client/dom/toggleUl.js to be generic instead of hard coded classes
* add comments / docs to components
* make components more generic less styles / id specific
* HTML template abstraction 
* move event bindings to pages
* update view page.html 
