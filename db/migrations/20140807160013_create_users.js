var CreateUsers = function() {
    this.up = function(next) {
        var def = function(t) {
                t.column('username', 'string');
                t.column('password', 'string');
                t.column('token', 'string');
                t.column('tokenExpiration', 'date');
            },
            callback = function(err, data) {
                if (err) {
                    throw err;
                }
                next();
            };

        this.createTable('user', def, callback);
    };

    this.down = function(next) {
        var callback = function(err, data) {
            if (err) {
                throw err;
            } else {
                next();
            }
        };
        this.dropTable('user', callback);
    };
};

exports.CreateUsers = CreateUsers;
