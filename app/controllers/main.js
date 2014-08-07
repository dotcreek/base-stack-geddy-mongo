var Main = function() {
    'use strict';
    this.index = function(req, resp, params) {
        this.send(200, params);
    };
};

exports.Main = Main;
