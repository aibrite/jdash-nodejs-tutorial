var express = require('express');
var bodyParser = require('body-parser');
var jexpress = require('jdash-express').default;




var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// create a router for jdash
var jdashRoutes = express.Router();

var mongoose = require('mongoose');
var jmongo = require('jdash-mongodb').default;

var connStr = 'Your connection string goes here';
connStr = 'mongodb://localhost:27017/jdash-local';




var connection = mongoose.createConnection(connStr);

connection.on('connected', function () {
    jexpress({
        principal: function (request) {
            return {
                user: request.user.id, // username which makes this request
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

})