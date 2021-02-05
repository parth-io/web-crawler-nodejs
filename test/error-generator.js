'use strict';

setInterval(function () {}, Number.MAX_VALUE); // keep process alive

var myEmitter = new (require('events').EventEmitter)();

/*
// add this handler before emitting any events
process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION - keeping process alive:', err); // err.message is "foobar"
});*/

var service = require('./service.js');

myEmitter.emit('error', new Error('foobar')); 
