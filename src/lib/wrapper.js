'use strict';

const Mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;

// define a log tag
const LogTag = require('constants').logTag;

class Wrapper extends EventEmitter {

    constructor(server, options) {

        super();
        if (options.promises === 'bluebird') {
            Mongoose.Promise = require('bluebird');
        }
        else if (options.promises === 'native') {
            Mongoose.Promise = global.Promise;
        }

        this.mongoose = Mongoose;
        this.connection = Mongoose.createConnection(
            options.uri,
            options.mongoose,
            (err) => {

                if (err) {
                    server.log(
                        [LogTag, 'error'],
                        `[MONGO] Error on handshake: ${err}`
                    );
                    this.emit('error', err);
                }
            });

        this.connection
            .on('connected', () => {

                server.log(
                    [LogTag, 'info'],
                    '[MONGO] Connected'
                );
                this.emit('ready');
            })
            .on('disconnected', () => {

                server.log(
                    [LogTag, 'warn'],
                    '[MONGO] Disconnected'
                );
                this.emit('disconnected');
            })
            .on('error', (err) => {

                server.log(
                    ['error', 'database', 'mongoose', 'mongodb'],
                    `[MONGO] Error: ${err.message}`
                );
                this.emit('error', err);
            })
            .on('close', () => {

                server.log(
                    [LogTag, 'info'],
                    '[MONGO] Connection closed'
                );
            });
    }
}

module.exports = Wrapper;
