var Users = function() {

    this.model = 'User';

    this.index = function(req, resp, params) {

        /**
         * If no service param is provided, then paginate all content
         */
        if (!params.username) {
            return this.paginateIt(params);
        }

        /**
         * Build query object for search function
         * @type {Object}
         */
        var inf = {
            search: {
                username: {
                    like: params.username
                }
            }
        };

        /**
         * Search based on inf obj, options available on search definition.
         */
        return this.search(inf);
    };

    /**
     * GET /users/:id
     */
    this.show = function(req, resp, params) {
        this.load(params.id);
    };

    /**
     * POST /users
     */
    this.create = function(req, resp, params) {
        if (!params.password) {
            return this.send(422, {
                password: 'password required'
            });
        }

        var self = this,
            inf = this.allowedParams(params),
            model;

        inf.password = geddy.model.User.passwordHash(inf.password);
        model = geddy.model.User.create(inf);

        model.saveUser(model, function(err, user) {
            return err ? self.send(422, err) : self.send(200, user);
        });
    };

    /**
     * PUT /users/:id
     */
    this.update = function(req, resp, params) {
        var self = this,
            inf = this.allowedParams(params);

        if (params.password) {
            inf.password = geddy.model.User.passwordHash(params.password);
        }

        return this.load(params.id, function(model) {
            model.updateProperties(inf);

            if (!model.isValid()) {
                return self.send(422, model.errors);
            }

            model.save(function(err, resp) {
                if (err) {
                    return self.send(422, err);
                }
                return self.send(200, resp);
            });
        });
    };

    /**
     * DELETE /users/:id
     */
    this.remove = function(req, resp, params) {
        var self = this;
        geddy.model.User.remove(params.id, function(err, data) {
            return err ? self.send(422, err) : self.send(200, data);
        });
    };

};

exports.Users = Users;
