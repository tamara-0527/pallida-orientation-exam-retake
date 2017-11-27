'use strict';

var express = require('express');
var mysql = require('mysql');

var app = express();
app.use('/', express.static('./'));
app.use(express.json());

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'clothes'
});
connection.connect((err) => {
  if(err) {
    console.log('Error connecting to MYSQL\n');
    return;
  };
  console.log('MYSQL connection established');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/warehouse', function(req, res) {
  let data = []
  connection.query('SELECT * FROM clothes.warehouse', function(err, result, fields) {
    console.log(result);
    result.forEach(element => {
      console.log(element)
      data.push(element);
    });
    res.send({
      'result': 'ok',
      'clothes': data
    });
  })
});

app.listen(8080, function(){
  console.log('server running');
})