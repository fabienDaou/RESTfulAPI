var Express = require('express'),
    BodyParser = require('body-parser');

this.restapi = Express();
this.restapi.use(BodyParser.json());
this.restapi.use(BodyParser.urlencoded({
    extended: true
}));
this.restapi.use('/rest', Express.static(__dirname + '/static'));

// in case of CORS
/*this.restapi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

this.start = function(dbmanager) {
    this.DBmanager = dbmanager;

    this.defineInterface();
    this.restapi.listen(5000); 
    console.log('Listening on port 5000');
}

this.defineInterface = function() {

    this.restapi.get("/rest/", function(req, res) {
        res.sendFile(__dirname + '/static/test.html');
    });

    ///
    /// Dude
    ///
    this.restapi.get('/rest/dudes', (req, res) => {
        this.DBmanager.getDudes([], {mode:'ALL'})
            .then(function(dudes) {
                res.send(JSON.stringify(dudes));
            });
    });

    this.restapi.get('/rest/dudes/:id', (req, res) => {
        this.DBmanager.getDudes([req.params.id])
            .then(function(dude) {
                res.send(JSON.stringify(dude));
            });
    });

    this.restapi.post('/rest/dudes', (req, res) => {
        this.DBmanager.addDude({
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email
        })
            .then(function(success) {
                console.log(success);
            });
    });

    this.restapi.delete('/rest/dudes/:id', (req, res) => {
        this.DBmanager.deleteDude([req.params.id])
            .then(function() {
                res.send({success:true});
            });
    });

    ///
    /// Dude profile version
    ///
    this.restapi.get('/rest/dudes/:id/versions', (req, res) => {
        this.DBmanager.getVersions(req.params.id)
            .then((versions) => {
                res.send(JSON.stringify(versions));
            });
    });

    this.restapi.post('/rest/dudes/:id/versions', (req, res) => {
        this.DBmanager.addVersion({dudeID: req.params.id})
            .then((success) => {
                console.log(success);
            });
    });

    ///
    /// Dude hobbies
    ///
    this.restapi.get('/rest/dudes/:id/hobbies', (req, res) => {
        this.DBmanager.getHobby(req.params.id)
            .then((hobbies) => {
                res.send(JSON.stringify(hobbies));
            });
    });

    this.restapi.get('/rest/dudes/:id/versions/:versionid/hobbies', (req, res) => {
        this.DBmanager.getHobby(req.params.id, req.params.versionid)
            .then((hobbies) => {
                res.send(JSON.stringify(hobbies));
            });
    });

    this.restapi.post('/rest/dudes/:id/versions/:versionid/hobbies', (req, res) => {
        this.DBmanager.addHobby({versionID: req.params.versionid, dudeID: req.params.id, hobbyTitle: req.body.hobbyTitle})
            .then((success) => {
                console.log(success);
            });
    });

    ///
    /// Dude jobs
    ///
    this.restapi.get('/rest/dudes/:id/jobs', (req, res) => {
        this.DBmanager.getJob(req.params.id)
            .then((jobs) => {
                res.send(JSON.stringify(jobs));
            });
    });

    this.restapi.get('/rest/dudes/:id/versions/:versionid/jobs', (req, res) => {
        this.DBmanager.getJob(req.params.id, req.params.versionid)
            .then((jobs) => {
                res.send(JSON.stringify(jobs));
            });
    });

    this.restapi.post('/rest/dudes/:id/versions/:versionid/jobs', (req, res) => {
        this.DBmanager.addJob({versionID: req.params.versionid, dudeID: req.params.id, jobTitle: req.body.jobTitle, company: req.body.company, location: req.body.location})
            .then((success) => {
                console.log(success);
            });
    });
}


