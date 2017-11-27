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
}

ajax('GET', 'http://localhost:8080/shoppingplanner', appendTable)