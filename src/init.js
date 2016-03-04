var fs = require('fs'),
    Sqlite = require('sqlite3').verbose(),
    Sequelize = require('sequelize'),
    DBmanager = require('./dbmanager.js'),
    RESTServer = require('./server.js');

var volatileDB = DBmanager.createVolatileDB();
DBmanager.connect();
DBmanager.initSchema();

DBmanager.seqConn.sync()
    .then(function() {
        console.log('Synced with sqlite DB.');
        RESTServer.start(DBmanager);

        // adding some stuff
        DBmanager.addDude({fullname: 'fabien', phone: '666', email: '@hell'})
            .then(() => {
                DBmanager.addVersion({dudeID: 1})
                    .then(() => {
                        DBmanager.addHobby({versionID: 1, dudeID: 1, hobbyTitle: 'hit qr7hur'});
                        DBmanager.addJob({versionID: 1, dudeID: 1, jobTitle: 'snoozer'});
                    });
            });
    });


var hal = require('hal');
 
var resource = new hal.Resource({name: "Harry"}, '/harry');
resource.link('hello', '/harry/hello');
console.log(resource.toJSON());


