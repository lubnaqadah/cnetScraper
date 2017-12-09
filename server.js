var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
var uri = 'mongodb://heroku_z65nrxzx:5npvcaej8n2htnb7vbcouj6ocs@ds135486.mlab.com:35486/heroku_z65nrxzx';

mongoose.Promise = Promise;
mongoose.connect(uri, {
	useMongoClient: true
});

//For Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes.js")(app);

// Start the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
