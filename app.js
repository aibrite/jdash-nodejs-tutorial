var express = require('express');
var bodyParser = require('body-parser');
var jexpress = require('jdash-express').default;



// Create an App
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Create a router for jdash
var jdashRoutes = express.Router();

var mongoose = require('mongoose');
var jmongo = require('jdash-mongodb').default;

var connStr = 'Your connection string goes here';
//connStr = 'mongodb://localhost:27017/jdash-local';


var connection = mongoose.createConnection(connStr);

// jexpress acts as a middleware for specified route.
// Configure JDash when database connection is ready.
connection.on('connected', function () {
    console.log('Connected to JDash Demo Mongo Database.')
    // Configure jexpress with principal and provider
    jexpress({
        principal: function (request) {
            return {
                user: 'current-user', // username which makes this request
                appid: "myapp" // application id of this app
            }
        },
        // Set provider
        provider: jmongo({
            connection: connection
        })
    }).use(jdashRoutes);
})


// Use this router
app.use('/jdash/api/v1', jdashRoutes);


app.listen(3001, function () {
    console.log('JDash Demo App launched at http://127.0.0.1:3001')
})
