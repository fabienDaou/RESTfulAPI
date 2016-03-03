var Express = require('express'),
    BodyParser = require('body-parser');

var restapi = Express();

restapi.use(BodyParser.json());
restapi.use(BodyParser.urlencoded({
    extended: true
}));

