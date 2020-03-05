var express = require('express');
var app = express();
var crypto = require('crypto');
const iv = crypto.randomBytes(16);


app.get('/token', function(req, res){
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update('surendar', 'utf8', 'hex')
    mystr += mykey.final('hex');
    res.send(mystr)
  })


  app.get('/api', function(req, res){
    var token = req.headers['token']
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(token, 'hex', 'utf8')
    mystr += mykey.final('utf8');    
    if(mystr=='surendar'){
        var msg = "surendar is the Owner";
        res.send(msg)
    }
    else {
        var msg="Wrong TRoken"
        res.send(msg);
      }
    })

app.listen(5544);