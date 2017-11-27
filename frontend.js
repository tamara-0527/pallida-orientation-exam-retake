'use strict';

function ajax (command, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(command, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
  console.log(xhr.responseText);
    var data = JSON.parse(xhr.responseText);
    callback(data);
  };
  xhr.send();
};

function appendTable(result) {
  var table = document.querySelector('table');
  table.innerHTML = `<tr>
                      <th>Id</th>
                      <th>Item name</th>
                      <th>Manufacturer</th> 
                      <th>Category</th>
                      <th>Size</th>
                      <th>Unit price</th>
                    </tr>
  `
  result.forEach(function(element) {
    const selectedItems = `<tr>
                      <td>${element.id}</td>
                      <td>${element.item_name}</td>
                      <td>${element.manufacturer}</td>
                      <td>${element.category}</td>
                      <td>${element.size}</td>
                      <td>${element.unit_price}</td>                   
                    </tr>
    `
    table.innerHTML += selectedItems;
  }, this);
};

function creatingNameOptions(arr) {
  arr.forEach(function(element) {
    let selected = document.querySelector('#name');
    let nameOptions = document.createElement('option');
    nameOptions.textContent = element.item_name;
    selected.appendChild(nameOptions);
  });
};

function creatingSizeOptions(arr) {
  arr.forEach(function(element) {
    let selected = document.querySelector('#size')
    let sizeOptions = document.createElement('option');
    sizeOptions.textContent = element.size;
    selected.appendChild(sizeOptions);
  });
};

ajax('GET', 'http://localhost:8080/warehouse', appendTable);
ajax('GET', 'http://localhost:8080/warehouse', creatingNameOptions);
ajax('GET', 'http://localhost:8080/warehouse', creatingSizeOptions);

