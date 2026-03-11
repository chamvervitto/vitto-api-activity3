const http = require('http');

const postData = JSON.stringify({
  name: "Pizza Margherita",
  price: 12.99,
  category: "Main",
  isVegetarian: true
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v1/dishes',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(postData);
req.end();

