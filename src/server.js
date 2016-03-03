var fs = require('fs'),
    Sqlite = require('sqlite3').verbose(),
    Sequelize = require('sequelize'),
    DBmanager = require('./dbmanager.js');

var NUMBER_OF_CONNECTIONS = 0;


var volatileDB = DBmanager.createVolatileDB();
DBmanager.connect();
DBmanager.initSchema();

DBmanager.seqConn.sync().then(function() {
    console.log('Synced with sqlite DB.');
    //DBmanager.seqConn.models.Dude.hasMany(DBmanager.seqConn.models.DudeProfileVersion, {foreignKeyConstraint: true, foreignKey: 'DudeID'});
    DBmanager.addDude('hycariss', '666', 'hycariss@hell.com');
    DBmanager.startDoingStuff();
});


