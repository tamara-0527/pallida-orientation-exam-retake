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

app.get('/price-check', function(req, res) {
  let price = 'SELECT * FROM warehouse WHERE unit_price = ?';;
  let name = 'SELECT * FROM warehouse WHERE item_name = ?';
  let size = 'SELECT * FROM warehouse WHERE size = ?';
  let quantity = 'SELECT * FROM warehouse WHERE in_store = ?';
  let id = 'SELECT * FROM warehouse WHERE id = ?';  
  let selectedQuantity = document.querySelector('input');
  let total = selectedQuantity * price;

  connection.query(price, name, size, quantity,id, function(err, result, fields) {
      if (selectedQuantity > quantity) {
        res.send({
          "result": "error, we don't have enough items in store"
        });
      } else if(selectedQuantity < 3) {
        res.send({
          "result": "please order at least 3, one for yourself, two for your friends"
        });
      }
      res.send({
        'result': 'ok',
        'total-price': total
      });
    })
  });
    
app.listen(8080, function(){
  console.log('server running');
});
