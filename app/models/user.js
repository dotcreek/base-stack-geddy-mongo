var User = function() {
    this.hasher = require('password-hash');

    this.defineProperties({

        username: {
            type: 'string',
            required: true,
            length: {
                min: 4,
                max: 12
            }
        },

        password: {
            type: 'string',
            on: 'create',
            length: {
                min: 5
            }
        },

        token: {
            type: 'string'
        },

        tokenExpiration: {
            type: 'date'
        }
    });


    // this.validatesWithFunction('email', function(val) {
    //     return ((!val) || /^[^a-z]$/.test(val));
    // });

    /**
     * Verify stored password with param
     * @param  {String} password current login password
     * @return {Boolean}
     */
    this.validatePassword = function(password) {
        return this.hasher.verify(password, this.password);
    };

    /**
     * Generate a simple token
     * @param  {Function} callback executes a callback with token as param
     * @return {Function}
     */
    this.generateToken = function() {
        return geddy.string.uuid();
    };

    this.passwordHash = function(password) {

        /**
         * Encript password
         * @type {String}
         */
        return this.hasher.generate(password);
    };

    this.saveUser = function(user, callback) {
        var date = new Date(),
            expira = date.setHours(date.getHours() + geddy.config.expiration);

        user.tokenExpiration = expira;
        user.token = this.generateToken();
        if (!user.isValid()) {
            callback(user.errors, null);
        }

        user.save(function(err, usr) {
            if (err) {
                callback('Something happens', null);
                console.log('Error saving user', err);
                return;
            }

            /**
             * Should remove un-wanted params to be sent as response
             */
            return callback(null, usr);
        });
    };
};

exports.User = User;
