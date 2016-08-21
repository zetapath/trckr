var model = new falcor.Model({
 source: new falcor.HttpDataSource('/falcor/model.json')
});

// -- Static
model
  .get('greeting')
  .then(function(response) {
    console.log('Falcor/greeting', response.json)
  });

// -- Basic
model
  .get(['orders', {from: 0, to: 3}, ['id', 'createdAt']])
  // .get("orders[0..3]['id', 'createdAt', 'provider']")
  .then(function(response) {
    console.log('Falcor/orders', response.json.orders)
  });

// -- Non existent properties
model
  .get("orders.length")
  .then(function(response) {
    console.log('Falcor/orders.length', response.json.orders)
  })

// -- Multiple paths
model
  .get("orders['provider']")
  .then(function(response) {
    console.log('Falcor/orders.provider', response.json.orders)
  })
model
  .get(['orders', ['provider', 'createdAt']])
  // .get("orders['provider', 'createdAt']")
  .then(function(response) {
    console.log('Falcor/orders.provider', response.json.orders)
  })

// -- By Id
model
  .get("order['d32b00f0-1769-4326-a1d7-3a108af943e6']['id', 'createdAt']")
  .then(function(response) {
    console.log('Falcor/orders.orderById', response.json.order)
  })

// -- Combining
// model.get(["todos", {from: 0, to:1},"name"], ["todos", "length"]).then(function(response){
//     console.log(JSON.stringify(response));
// });

// -- Add Element
model
  .call(['orders', 'add'], ['hola'], ["name"])
  .then((response) => {
    console.log('Falcor/orders.add', response.json.orders)
  })
