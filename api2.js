var express = require('express');
var app = express();
const request = require('request');


  app.get('/api2', function(req, res){
    require('http').get('http://localhost:5544/token', (res) => {
        res.setEncoding('utf8');
        res.on('data', function (body) {
            console.log(body);
            CallApi1(body);
        });
    });
});

var CallApi1 = function(token) {
    const https = require('http')
    const options = {
    hostname: 'localhost',
    port: 5544,
    path: '/api',
    method: 'GET',
    headers: {
        'token': token,
      }
    }

    const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
    })

    req.on('error', error => {
    console.error(error)
    })

    req.end()


};

app.listen(5545);