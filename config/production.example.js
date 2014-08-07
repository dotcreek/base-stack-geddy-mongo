var config = {
    appName: 'Geddy App',
    detailedErrors: false,
    hostname: null,
    perPage: 10,
    port: 4000,
    model: {
        defaultAdapter: 'mongo'
    },
    db: {
        mongo: {
            username: '',
            dbname: 'bootkit_production',
            prefix: null,
            password: '',
            host: 'localhost',
            port: 27017
        }
    }
};

module.exports = config;
