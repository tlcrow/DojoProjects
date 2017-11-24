var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public/dist")));
app.use(session({secret: "thisissecret"}));
// app.set('views', path.join(__dirname, './client/views'));


require('./server/config/registration.js');

var routes_setter = require('./server/config/routes.js')
routes_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
});