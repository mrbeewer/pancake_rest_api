var express = require('express');
var router = express.Router();

var siteData = {
  title: 'Pancake API',
  version: '1.1.0',
  authors: 'DBeeler',
  date: '22DEC2015'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', siteData);
});

module.exports = router;
