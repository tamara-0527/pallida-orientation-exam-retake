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
  let names = 'SELECT DISTINCT item_name FROM clothes.warehouse GROUP by item_name;'
  let sizes = 'SELECT DISTINCT size FROM clothes.warehouse GROUP by size;'
  let data = []
  connection.query('SELECT id, item_name, manufacturer, category, size, unit_price FROM clothes.warehouse', names, function(err, result, fields) {
    result.forEach(element => {
      data.push(element);
    });
    res.send(data);
  })
});

// app.get('/check', function(req, res))

app.listen(8080, function(){
  console.log('server running');
})