'use strict';
const mongoose = require('mongoose');
const { countConnect } = require('../helpers/check.connect');
const {db: {host, port, name}} = require('../config/config.mongodb');
const connectionString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this._connect();
    }

    // Connect db
    _connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 50 })
            .then((_) => {
                console.log('Database connection successful', countConnect());
            })
            .catch(err => {
                console.error('Database connection error!');
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;