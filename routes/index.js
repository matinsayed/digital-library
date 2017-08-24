var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var mysql = require('mysql');
var con = require('../config/db_conn');

router.get('/checkout', isLoggedIn, function(req,res,next){
  if (!req.session.cart) {
      return res.redirect('/shopping-cart');
      }
      var cart = new Cart(req.session.cart);
      res.render('cart/checkout', { title: '- Check out', total:cart.totalPrice });
});

router.post('/checkout', isLoggedIn, function(req,res,next){
  var cart = new Cart(req.session.cart);
  cart.SaveOrder(req.session.user, req.session.cart);
  req.session.successMsg = 'Successfully bought product(s)!';
  req.session.cart = null;
  res.redirect('/user/profile');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  con.query('select * from vw_categories order by 2', function(err,categories,fields) {
    if (err) throw err;
    if(req.session.successMsg) {
      var successMsg = req.session.successMsg;
      req.session.successMsg = null;
    }
    else {
      var successMsg = null;
    }

    res.render('index', { title: '- Home', categories:categories, successMsg: successMsg  });
  });
});

router.get('/add-to-cart/:id', function (req,res,next){
  var productid = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  con.query('select id, name, unitprice from products where id =' + productid + ' LIMIT 1', function(err, product){
    if(err) {
      return res.redirect('/');
    }
    else {
      if (Array.isArray(product))      {
      cart.add(product[0], product[0].id);
      }
      else {
        cart.add(product, product.id);
      }
      req.session.cart = cart;
      req.session.successMsg = "Successfully added the product to cart!";
      res.redirect('/');
    };
  });
});

router.get('/reduce/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});


router.get('/shopping-cart', function(req, res, next){
  if (!req.session.cart)
      return res.render('cart/view', {products : null});
    var cart = new Cart(req.session.cart);
    res.render('cart/view', { title: '- Shopping Cart', products: cart.generatedArray(), totalPrice: cart.totalPrice});
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
  {
    return next();
  }
  req.session.redirectURL = req.url;
  res.redirect('/user/login');
}
