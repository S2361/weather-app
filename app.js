const express = require('express');
const app = express();
const apiKey = '86bc0c7700ff45abb28175214230911';
let city;
let link = 'http://api.weatherapi.com/v1/current.json?key=86bc0c7700ff45abb28175214230911&q=College Park&aqi=no';
/*
app.get('/', (req, res) => {
    res.send('Hello, this is your Node.js website!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

*/
//this retrieves possible list of cities beginning with lond
// fetch('http://api.weatherapi.com/v1/search.json?key=' + apiKey + '&q=lond')
fetch(link)
    .then(res => res.json())
    .then(data => console.log(data))