const express = require('express');
const {default: helmet} = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const app = express();

// console.log(`Process:: `, process.env);


// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init db
require('./dbs/init.mongodb');

// Init routes
app.use('/', require('./routes'));
// Handle errors

module.exports = app;