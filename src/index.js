'use strict';

const Hoek = require('@hapi/hoek');
const MongooseWrapper = require('./lib/wrapper');

const Constants = require('./lib/constants');

const internals = {};
internals.defaults = {
    uri: Constants.defaults.uri,
    promises: Constants.defaults.promises,
    mongooseOptions: {}
};

module.exports = {
    /**
     * Register method.
     * @param server
     * @param options
     * @returns {Promise.<void>}
     */
    async register(server, options) {

        const settings = Hoek.applyToDefaults(internals.defaults, options);
        const connector = new MongooseWrapper(server, settings);
        await new Promise((resolve, reject) => {

            connector.on('ready', () => {
                server.expose('connection', connector.connection);
                server.expose('mongoose', connector.mongoose);
                resolve();
            });

            connector.on('error', (err) => reject(err));
        });
    },

    /**
   * Export package.
   */
    pkg: require('../package.json')
};
