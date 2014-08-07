/**
 * Main Controller.
 */
var Application = function() {
    'use strict';

    /**
     * Override this property on all controller, will help us to DRY our code
     * on functions like load, show, paginateIt and so on.
     * @type {String}
     */
    this.model = '';

    /**
     * If false, all methods inside current controller will pass authorization
     * @type {Boolean}
     */
    this.authenticate = true;

    /**
     * Add any controller action to be excluded for authentication
     * @type {Object}
     */
    this.skipActions = {};

    /**
     * Store current user information
     * @type {Object}
     */
    this.currentUser = null;

    /**
     * Options available ['html', 'json', 'xml', 'js', 'txt'];
     * @type {Array}
     */
    this.respondsWith = ['json'];


    /**
     * Set headers for CORSS
     */
    this.before(function() {
        var resp = this.response;
        var inf = {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, authtoken',
            'Access-Control-Max-Age': 5184000 //2 months
        };

        resp.setHeaders(200, inf);

        if ('OPTIONS' === this.request.method) {
            resp.finish();
            return;
        }
    });

    /**
     * validate the requested user by auth token
     * @param  {Function} next callback to procede with excecution
     */
    this.before(function(next) {
        var token = this.request.headers.authtoken,
            self = this;

        self.userToken = token;
        /**
         * Check if we need to manage authentication on current controller
         */
        if (!this.authenticate || this.skipActions[this.params.action]) {
            /**
             * No needed authentication
             */
            geddy.log.debug('No authentication required');
            return next();
        }

        if (!token) {
            return self.send(422, 'AuthToken required');
        }

        geddy.log.debug('Authentication required');

        /**
         * Find user by token
         */
        geddy.model.User.first({
            token: token
        }, function(err, data) {
            if (err) {
                return self.send(422, err);
            }
            if (!data) {
                return self.send(404, 'You must sign in first');
            }
            self.currentUser = data;
            next();
        });
    }, {
        async: true
    });

    /**
     * ExpressJS style to send responses
     * @param  {Numeric} code  http status code
     * @param  {Object} object Any object you want to send as response
     */
    this.send = function(code, object) {
        this.respond(object, {
            statusCode: code
        });
    };

    /**
     * Load model information on ['update', 'show']
     * @param  {Object}   params   Params from request object
     * @param  {String}   model    Model name like: Post, Product
     * @param  {Function} callback Function to be used on success find model
     * @return {Object}            return errors or execute callbac
     */
    this.load = function(query, callback) {

        if (!query) {
            return this.send(422, 'Params required');
        }

        var self = this;
        geddy.model[this.model].first(query, function(err, data) {
            if (err) {
                console.log(err);
                self.send(422, 'Cant process your request righ now');
                throw err;
            }
            if (!data) {
                return self.send(404);
            }
            return callback ? callback(data) : self.send(200, data);
        });
    };

    this.count = function(callback) {
        var self = this;
        geddy.model[this.model].count(function(err, count) {
            if (err) {
                console.log(err);
                return self.send(500, 'Something wrong happens');
            }
            return callback(count);
        });
    };

    /**
     * Search, used for autocomplete and similars
     * @param  {Object}   params   {search: {}, limit: x, sort: {}}
     * @param  {Function} callback
     */
    this.search = function(params, callback) {
        var self = this;

        geddy.model[self.model].all(params.search, {
            sort: params.sort || {},
            limit: +params.limit || geddy.config.perPage,
            nocase: true
        }, function(err, models) {
            if (err) {
                console.log(err);
                return self.send(500, err);
            }
            return callback ? callback(models) : self.send(200, models);
        });
    };

    this.paginateIt = function(params, callback) {
        var self = this,
            page, perPage, skip;

        /**
         * We need: page default to 1, and optional perPage
         */
        page = params.page || 1;

        /**
         * How many records send per page, by default get value from app
         * configuration.
         * @type {Number}
         */
        perPage = params.perPage || geddy.config.perPage;

        /**
         * How many records skip in order to return page requested
         * @type {Number}
         */
        skip = page === 1 ? 0 : ((page - 1) * perPage);


        this.count(function(count) {
            var inf = {
                pagination: {
                    page: page,
                    perPage: perPage,
                    total: count
                }
            };

            if (+count === 0) {
                return self.send(inf);
            }

            geddy.model[self.model].all({}, {
                sort: {},
                skip: skip,
                limit: +perPage
            }, function(err, models) {
                if (err) {
                    console.log(err);
                    return self.send(500, err);
                }

                inf.data = models;
                return callback ? callback(inf) : self.send(200, inf);
            });
        });
    };


    /**
     * Given model, and params, check model properties agains params
     * @param  {String} model  i.e Post, Organization
     * @param  {Object} params
     * @return {Object}        allowed object from params
     */
    this.allowedParams = function(params) {
        var options = geddy.model.descriptionRegistry[this.model].properties,
            properties = Object.keys(options),
            content = {};

        properties.map(function(property) {
            if (params[property]) {
                content[property] = params[property];
            }
        });
        return content;
    };

    /**
     * Save any model, if there are some errors, return errors, otherwise return
     * saved models
     * @param  {Object}   model    any model instance, to create or update
     * @param  {Function} callback execute function provided
     * @return {Object}       send errors or saved instance
     */
    this.saveModel = function(model, callback) {
        if (!model) {
            return;
        }
        var self = this;
        if (!model.isValid()) {
            return self.send(422, model.errors);
        }

        model.save(function(err, data) {
            if (err) {
                console.log(err);
                return self.send(500, 'Something wrong');
            }

            return callback ? callback(data) : self.send(200, data);
        });
    };

    /**
     * GET /resources
     * Override this function on any controller needed, by default it works for
     * all controllers with index action, override to provide new behaviour
     */
    this.index = function(req, resp, params) {
        return this.paginateIt(params);
    };

    /**
     * GET /resources/:id
     * Override this function on any controller, if your need
     * different behaviour
     */
    this.show = function(req, resp, params) {
        this.load(params.id);
    };

    /**
     * POST /[resource]
     */
    this.create = function(req, resp, params) {
        var inf = this.allowedParams(params),
            model;

        model = geddy.model[this.model].create(inf);
        this.saveModel(model);
    };

    /**
     * PUT /[resource]/:id
     */
    this.update = function(req, resp, params) {
        var self = this,
            inf;

        inf = this.allowedParams(params);

        return this.load(params.id, function(model) {
            model.updateProperties(inf);
            self.saveModel(model);
        });
    };

    /**
     * DELETE /[resource]/:id
     */
    this.remove = function(req, resp, params) {
        var self = this;
        geddy.model[this.model].remove(params.id, function(err, data) {
            return err ? self.send(422, err) : self.send(200, data);
        });
    };
};

exports.Application = Application;
