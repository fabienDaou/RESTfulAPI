var Express = require('express'),
    BodyParser = require('body-parser');

this.restapi = Express();
this.restapi.use(BodyParser.json());
this.restapi.use(BodyParser.urlencoded({
    extended: true
}));
this.restapi.use('/rest', Express.static(__dirname + '/static'));
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

    this.restapi.get('/rest/dudes', (req, res) => {
        this.DBmanager.getDudes([], {mode:'ALL'})
            .then(function(tuples) {
                res.send(JSON.stringify(tuples));
            });
    });

    this.restapi.get('/rest/dudes/:id', (req, res) => {
        this.DBmanager.getDudes([req.params.id])
            .then(function(tuple) {
                res.send(JSON.stringify(tuple));
            });
    });

    this.restapi.post('/rest/dudes', (req, res) => {
        this.DBmanager.addDude({
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email
        })
            .then(function(data) {
                console.log(data);
            });
    });
}


