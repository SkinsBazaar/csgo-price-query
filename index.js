'use strict';

var express = require('express');
var csgomarket = require('csgo-market');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function (req, res) {
  if (!req.query || !req.query.weapon || !req.query.skin || !req.query.wear || !req.query.stattrak) {
    return res.status(400).send('Missing parameter');
  }

  csgomarket.getSinglePrice(req.query.weapon, req.query.skin, req.query.wear, req.query.stattrak, function (err, data) {
    if (err) { return res.status(400).send(err); }
    res.status(200).send(data);
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('[CS:GO Market Prices] ready');
});
