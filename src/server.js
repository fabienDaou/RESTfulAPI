var Express = require('express'),
    BodyParser = require('body-parser');

var Server = function() {};

Server.prototype.restapi = Express();
Server.prototype.restapi.use(BodyParser.json());
Server.prototype.restapi.use(BodyParser.urlencoded({
    extended: true
}));
Server.prototype.restapi.use('/rest', Express.static(__dirname + '/static'));

// in case of CORS
/*this.restapi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

Server.prototype.DBmanager = {};

Server.prototype.start = function(dbmanager) {
    this.DBmanager = dbmanager;

    this.defineInterface();
    this.restapi.listen(5000); 
    console.log('Listening on port 5000');
}

Server.prototype.defineInterface = function() {

    this.restapi.get("/rest/", (req, res) => {
        res.sendFile(__dirname + '/static/test.html');
    });

    ///
    /// Dude
    ///
    this.restapi.get('/rest/dudes', (req, res) => {
        this.DBmanager.getDudes([], {mode:'ALL'})
            .then((dudes) => {
                res.send(dudes);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.get('/rest/dudes/:id', (req, res) => {
        this.DBmanager.getDudes([req.params.id])
            .then((dude) => {
                res.send(dude);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.patch('/rest/dudes/:id', (req, res) => {
        var update = {};
        update.DudeID = req.params.id;
        if(req.body.fullname) update.Fullname = req.body.fullname;
        if(req.body.phone) update.Phone = req.body.phone;
        if(req.body.email) update.Email = req.body.email;

        this.DBmanager.updateDude(update)
            .then((nbrUpdated) => {
                res.send({updated: nbrUpdated[0]});
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error:true});
            });
    });

    this.restapi.post('/rest/dudes', (req, res) => {
        this.DBmanager.addDude({
            fullname: req.body.fullname ? req.body.fullname : '',
            phone: req.body.phone ? req.body.phone : '',
            email: req.body.email ? req.body.email : '',
        })
            .then((createdDude) => {
                console.log(createdDude);
                res.send(createdDude.dataValues);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.delete('/rest/dudes/:id', (req, res) => {
        this.DBmanager.deleteDude([req.params.id])
            .then(() => {
                res.send({deleted:true});
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    ///
    /// Dude profile version
    ///
    this.restapi.get('/rest/dudes/:id/versions', (req, res) => {
        this.DBmanager.getVersions(req.params.id)
            .then((versions) => {
                res.send(versions);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.post('/rest/dudes/:id/versions', (req, res) => {
        this.DBmanager.addVersion({dudeID: req.params.id})
            .then((createdVersion) => {
                console.log(createdVersion);
                res.send(createdVersion.dataValues);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    ///
    /// Dude hobbies
    ///
    this.restapi.get('/rest/dudes/:id/hobbies', (req, res) => {
        this.DBmanager.getHobby(req.params.id)
            .then((hobbies) => {
                res.send(hobbies);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.get('/rest/dudes/:id/versions/:versionid/hobbies', (req, res) => {
        this.DBmanager.getHobby(req.params.id, req.params.versionid)
            .then((hobbies) => {
                res.send(hobbies);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.post('/rest/dudes/:id/versions/:versionid/hobbies', (req, res) => {
        var newHobby = {};
        newHobby.versionID = req.params.versionid;
        newHobby.dudeID = req.params.id;
        if(req.body.hobbyTitle) newHobby.hobbyTitle = req.body.hobbyTitle;

        this.DBmanager.addHobby(newHobby)
            .then((createdHobby) => {
                console.log(createdHobby);
                res.send(createdHobby.dataValues);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    ///
    /// Dude jobs
    ///
    this.restapi.get('/rest/dudes/:id/jobs', (req, res) => {
        this.DBmanager.getJob(req.params.id)
            .then((jobs) => {
                res.send(jobs);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.get('/rest/dudes/:id/versions/:versionid/jobs', (req, res) => {
        this.DBmanager.getJob(req.params.id, req.params.versionid)
            .then((jobs) => {
                res.send(jobs);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });

    this.restapi.post('/rest/dudes/:id/versions/:versionid/jobs', (req, res) => {
        var newJob = {};
        newJob.versionID = req.params.versionid;
        newJob.dudeID = req.params.id;
        if(req.body.jobTitle) newJob.jobTitle = req.body.jobTitle;
        if(req.body.company) newJob.company = req.body.company;
        if(req.body.location) newJob.location = req.body.location;

        this.DBmanager.addJob(newJob)
            .then((createdJob) => {
                console.log(createdJob);
                res.send(createdJob.dataValues);
            })
            .catch((error) => {
                console.log(error); // logger here
                res.send({error: true});
            });
    });
}

module.exports = new Server();
