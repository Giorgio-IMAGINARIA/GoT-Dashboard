var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'ab-tools:9200',
    // httpAuth: 'elastic:changeme',
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


app.post('/db/data', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {
                console.log('req.body.timeFilter', req.body.timeFilter);
                var queryToPass;

                 var timestampToPass;
                    if (!req.body.timeFilter.startTime) {
                        timestampToPass = {
                            lt: req.body.timeFilter.endTime
                        }
                    } else if (!req.body.timeFilter.endTime) {
                        console.log('req.body.timeFilter.startTime: ', req.body.timeFilter.startTime);
                        timestampToPass = {
                            gte: req.body.timeFilter.startTime
                        }
                    } else {
                        timestampToPass = {
                            gte: req.body.timeFilter.startTime,
                            lt: req.body.timeFilter.endTime
                        }
                    }
                    queryToPass = {
                        range: {
                            "@timestamp": timestampToPass
                        }
                    }








                client.search({
                    index: 'blockchain-data-timestamp',
                    type: 'gateway',
                    body: {
                        query: queryToPass
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




















app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist', 'index.html'));
})

app.listen(PORT, function () {
    console.log('The server is running @ PORT:' + PORT);
})