'use strict';

var CustomTest = {};

/**
 * Test default configuration properties for modelName passed
 * @param  {String} modelName  i.e: Post, Comment
 * @param  {Array} properties  [{name: 'foobar', 'datatype': 'string'}]
 */
CustomTest.modelDefaults = function(modelName, properties) {
    var defaults = geddy.model.descriptionRegistry[modelName].properties;

    properties.map(function(opt) {
        describe(opt.name, function() {
            it('name should be ' + defaults[opt.name].name, function() {
                expect(opt.name).to.be.equal(defaults[opt.name].name);
            });

            it('datatype should be ' + defaults[opt.name].datatype, function() {
                expect(opt.datatype).to.be.equal(defaults[opt.name].datatype);
            });
        });
    });
};

CustomTest.modelValidations = function(model, validations) {

    describe('Default Validations', function() {
        beforeEach(function(done) {
            this.model = geddy.model[model].create();
            done();
        });

        validations.map(function(opt) {
            it('should be invalid without ' + opt, function() {
                expect(this.model.isValid()).to.be.equal(false);
            });
        });
    });
};

CustomTest.validModel = function(modelName, inf) {
    var model = geddy.model[modelName].create(inf);
    describe('Valid Model', function() {
        it('should be valid with all required properties', function() {
            if (!model.isValid()) {
                console.log("\t", model.errors);
            }
            expect(model.isValid()).to.be.equal(true);
        });
    });
};

/**
 * Add it to global namespace
 */
global.CustomTest = CustomTest;
