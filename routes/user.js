var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

var con = require('../config/db_conn');
require('../config/passport');

router.get('/profile', isLoggedIn, function(req,res,next){
  con.query('select * from orders where userid=?', [req.session.user.id], function(err,orders, fields){
  if (err) throw err;
  res.render('user/profile', {title: '- User Profile', orders:orders});
  });

});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req,res,next){
  next();
});

router.get('/signup', function (req,res,next){
    var messages = req.flash('error');
    res.render('user/signup', { title: '- Sign up', csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length > 0});
});
router.post('/signup', passport.authenticate('local-signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function(req,res,next){
  if(req.session.redirectURL) {
    var url = req.session.redirectURL;
    req.session.redirectURL = null;
    res.redirect(url);
    }
    else {
      res.redirect('/user/profile');
    }
});

router.get('/login', function (req,res,next){
    var messages = req.flash('error');
    res.render('user/login', { title: '- Log in', csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length > 0});
});

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/user/login',
  failureFlash: true,
  badRequestMessage: 'something went wrong'
}), function(req,res,next){
  if(req.session.redirectURL) {
    var url = req.session.redirectURL;
    req.session.redirectURL = null;
    res.redirect(url);
    }
    else {
      res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
