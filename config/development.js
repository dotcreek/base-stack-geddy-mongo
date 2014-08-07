var config = {
    appName: 'My Awesome Geddy App(development)',
    detailedErrors: true,
    debug: true,
    hostname: null,
    port: 4000,

    testing: false,

    /**
     * Custom config
     */

    /**
     * Pagination default limit response
     * @type {Number}
     */
    perPage: 10,

    /**
     * Hours to expire token
     * @type {Number}
     */
    expiration: 4,

    model: {
        defaultAdapter: 'mongo'
    },

    db: {
        mongo: {
            username: '',
            dbname: 'geddy_development',
            prefix: null,
            password: '',
            host: 'localhost',
            port: 27017
        }
    },

    sessions: null
};

module.exports = config;
