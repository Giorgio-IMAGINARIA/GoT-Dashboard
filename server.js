var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'ab-tools:9200',
    httpAuth: 'elastic:changeme',
    log: 'trace'
});
// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

var express = require('express');
var path = require('path');
var compression = require('compression');
// var email = require('emailjs/email');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8081;

var app = express()
app.use(compression())
//Serve static content for the app from the "dist" directory in the application directory.
app.use(express.static(__dirname + '/dist'));
// Mount the middleware at "/public" to serve static content only when their request path is prefixed with "/public".
app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/db/data', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {


                client.search({
                    index: 'blockchain-data-timestamp',
                    type: 'gateway',
                    body: {
                        query: {
                            match_all: {}
                        }
                    }
                }).then(function (resp) {
                    var hits = resp.hits.hits;
                    console.log('success: ', hits);
                    var elasticObject = { elasticDBArray: hits };
                    res.json(elasticObject);
                    resolve('success');
                }, function (err) {
                    console.trace(err.message);
                    reject('there was an error in the DB: ' + err.message);
                });



            });
        });
});



app.get('/db/projects', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {






                currentCollection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, items) {
                        if (err) {
                            reject('there was an error in the DB: ' + err);
                        } else {
                            console.log('success: ', items);
                            var projectsDBObject = { projectsDBArray: items };
                            console.log('here are the projects');
                            res.json(projectsDBObject);
                        }
                    });
                });





            });
        });
});




















app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist', 'index.html'));
})

app.listen(PORT, function () {
    console.log('The server is running @ PORT:' + PORT);
})