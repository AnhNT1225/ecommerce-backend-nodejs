'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;
//count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections:: ${numConnection}`);
};

// check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        console.log(`Number of cores: ${numCores}`);
        console.log(`Active connections: ${numConnection}`);

        // Example maximum number of connections based on numbers of cores
        const maxConnections = numCores * 5;

        if (numConnection > maxConnections) {
            console.warn('Warning: Connection overload detected!');
            // Here you can add logic to handle overload, e.g., close some connections or alert admin
        }
    }, _SECOND); //Monitor every 5 seconds
};

module.exports = { countConnect, checkOverload };