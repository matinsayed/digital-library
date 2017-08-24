var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('../config/db_conn');

router.get('/', function(req, res, next) {
  var qs = req.query;
  if (qs.id)  {
    con.query('select * from vw_products where categoryid = ' + qs.id + ' order by 2', function(err,result,fields) {
      if (err) throw err;
      res.render('products', { title: 'Product List', result:result });
      });
  }
  else {
    con.query('select * from vw_products order by 2', function(err,result,fields) {
      if (err) throw err;
      res.render('products', { title: 'Product List', result:result });
      });
    };
});

module.exports = router;
