var Mocha = require('mocha'),
    fs = require('fs'),
    mocha, runTests;

mocha = new Mocha({
    // reporter: 'mocha-real-json-reporter',
    reporter: 'spec',
    ui: 'bdd',
    timeout: '10000'
});

geddy.testing = true;

/**
 * Function reused to run tests from models and controllers tasks.
 * @return {Function}
 */
runTests = function() {
    mocha.options.ignoreLeaks = true;
    mocha.run();
};

console.log('adding file', mocha.files);
/**
 * Helpers to be reused on similar tests
 */
mocha.addFile('test/unit_helper.js');

/**
 * Do not require chai and set chai's properties to scope variables on any
 * test.
 * global.should = chai.should();
 * global.assert = chai.assert;
 */
global.chai = require('chai');

/**
 * TODO: research about assigning this as global is bad or acceptable
 */
global.expect = chai.expect;

/**
 * Namespace to run some componnents of the API
 * @ref http://jebchit.info/pr/browse.php/Oi8vamFr/ZWpzLmNv/bS9kb2Nz/b5/
 * @return {Object}
 */
namespace('tests', function() {


    desc('With this task, we will run all tests related to models');
    task('models', function(model) {

        fs.readdirSync('test/unit/models').filter(function(file) {
            /**
             * Add all files from 'test/unit/models' directory if no model was passed
             * as param
             * CLI: geddy jake tests:models
             */
            if (!model) {
                return mocha.addFile('test/unit/models/' + file);
            }

            /**
             * Add only model passed as param
             * CLI: geddy jake tests:models[modelName]
             */
            if (file.toLowerCase().replace('.js', '') === model) {
                return mocha.addFile('test/unit/models/' + file);
            }
        });
        return runTests();
    });

    desc('With this task, we will run all tests related to controllers');
    task('controllers', function(controller) {
        fs.readdirSync('test/unit/controllers').filter(function(file) {

            /**
             * Add all files from test/unit/controllers folder, if there's no
             * controller from params
             * CLI;
             *     geddy jake tests:controllers
             */
            if (!controller) {
                return mocha.addFile('test/unit/controllers/' + file);
            }

            /**
             * Add only controller passed as params
             * CLI:
             *     geddy jake tests:controllers[controllerName]
             */
            if (file.toLowerCase().replace('.js', '') === controller) {
                return mocha.addFile('test/unit/controllers/' + file);
            }
        });

        return runTests();
    });
});

namespace('integra', function() {

    desc('With this task, we will run all integration tests for models');
    task('models', function(model) {

        fs.readdirSync('test/integration/models').filter(function(file) {
            /**
             * Add all files from 'test/integration/models' directory if no model was passed
             * as param
             * CLI: geddy jake tests:models
             */
            if (!model) {
                return mocha.addFile('test/integration/models/' + file);
            }

            /**
             * Add only model passed as param
             * CLI: geddy jake tests:models[modelName]
             */
            if (file.toLowerCase().replace('.js', '') === model) {
                return mocha.addFile('test/integration/models/' + file);
            }
        });
        return runTests();
    });

    desc('With this task, we will run all integration tests for controllers');
    task('controllers', function(controller) {
        fs.readdirSync('test/integration/controllers').filter(function(file) {

            /**
             * Add all files from test/integration/controllers folder, if there's no
             * controller from params
             * CLI;
             *     geddy jake tests:controllers
             */
            if (!controller) {
                return mocha.addFile('test/integration/controllers/' + file);
            }

            /**
             * Add only controller passed as params
             * CLI:
             *     geddy jake tests:controllers[controllerName]
             */
            if (file.toLowerCase().replace('.js', '') === controller) {
                return mocha.addFile('test/integration/controllers/' + file);
            }
        });

        return runTests();
    });
});

namespace('unit', function() {
    task('models', function(model) {
        jake.Task['tests:models'].invoke(model);
    });
    task('controllers', function(controller) {
        jake.Task['tests:controllers'].invoke(controller);
    });
});

namespace('integration', function() {

    /**
     * Run integration tests for models
     * @param  {String} model name
     */
    task('models', function(model) {
        jake.Task['tests:models'].invoke(model);
    });

    /**
     * Run integration tests for controllers
     * @param  {String} controller name
     */
    task('controllers', function(controller) {
        jake.Task['tests:controllers'].invoke(controller);
    });
});

task('unit', function() {
    jake.Task['unit:models'].invoke();
    jake.Task['unit:controllers'].invoke();
});

task('integration', function() {
    jake.Task['integration:models'].invoke();
    jake.Task['integration:controllers'].invoke();
});

task('jshint', function(path) {
    var cmd = 'jshint --reporter node_modules/jshint-stylish/stylish.js ';
    var opt = path ? path : 'app/ config/ lib/ test/';
    jake.exec(cmd + opt, {
        printStdout: true,
        interactive: true
    }, function() {
        console.log('Your ' + opt + ' has ben hs-hinted! :D');
        complete();
    });
});
