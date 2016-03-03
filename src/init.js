var fs = require('fs'),
    Sqlite = require('sqlite3').verbose(),
    Sequelize = require('sequelize'),
    DBmanager = require('./dbmanager.js'),
    RESTServer = require('./server.js');

var volatileDB = DBmanager.createVolatileDB();
DBmanager.connect();
DBmanager.initSchema();

DBmanager.seqConn.sync().then(function() {
    console.log('Synced with sqlite DB.');
    RESTServer.start(DBmanager);
});


