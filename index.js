'use strict';

var request = require('request');
var express = require('express');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  if (!req.query || !req.query.hash) {
    return res.status(400).send('Missing parameter');
  }

  request({
    uri: 'http://steamcommunity.com/market/priceoverview',
    json: true,
    qs: {
      currency: 'dollar',
      appid: 730,
      market_hash_name: req.query.hash
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200 && body && body.success === true) {

      return res.status(200).send({
        volume: body.volume,
        lowest: body.lowest_price.substr(5),
        median: body.median_price.substr(5)
      });

    } else {
      return res.status(400).send(error);
    }
  });

});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('[CS:GO Market Prices] ready');
});
