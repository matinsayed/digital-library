var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var con = require('../config/db_conn');
var passport = require('passport');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
      var cipher = crypto.createCipher(algorithm,password)
      var crypted = cipher.update(text,'utf8','hex')
      crypted += cipher.final('hex');
      return crypted;
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  con.query('select id, name, emailid, password from users where id = ?', id , function(err,user) {
    if (err) throw err;
    done(err, user[0]);
    });
});

passport.use('local-signup', new LocalStrategy({
        usernameField : 'emailid',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, emailid, password, done) {
      req.checkBody('emailid', 'Invalid Email!').notEmpty().isEmail();
      req.checkBody('password', 'Invalid Password!').notEmpty().isLength({min:4});

      var errors = req.validationErrors();

      if(errors) {
        console.log('**********error');
        var messages = [];
        errors.forEach(function (error){
          messages.push(error.msg);
        });
        return done(null,false,req.flash('error', messages));
      };
      var user = req.body;
      con.query("select emailid from users where emailid = '" + user.emailid + "'",function(err,rows){
			if (err){
            return done(err);
      }
			if (rows.length) {
                return done(null, false, {message:'That email is already taken.'});
      }
       else {

        	var insertQuery = "INSERT INTO users ( name, emailid, password ) values ('" + user.username + "','" + user.emailid + "','" + encrypt(user.password) + "')";

        	con.query(insertQuery,function(err,result){
            var newUserMysql = new Object();
            newUserMysql.id = result.insertId;
            newUserMysql.username    = user.username;
            newUserMysql.emailid    = user.emailid;
            req.session.user = newUserMysql;
        		return done(null, newUserMysql);
        	});
      }
		});
}));

passport.use('local-login', new LocalStrategy({
  usernameField : 'emailid',
  passwordField : 'password',
  passReqToCallback: true
}, function (req,emailid,password,done) {
  console.log('function call');
  req.checkBody('emailid', 'Invalid Email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});

  var errors = req.validationErrors();

  if(errors) {
    var messages = [];
    errors.forEach(function (error){
      messages.push(error.msg);
    });
    return done(null,false,req.flash('error', messages));
  }
  else {
    con.query("select id, name, emailid from users where emailid = ? and password = ? ", [emailid, encrypt(password)],
    function(err,rows){
      if (err){
          return done(err);
      }
      if (rows.length == 0) {
              return done(null, false, { message:'Invalid e-mail / password. Please try again.' });
      }
      var user = new Object();
      user.id = rows[0].id;
      user.username = rows[0].name;
      user.emailid = rows[0].emailid;
      req.session.user = user;
      return done(null, user);
      });
  }
}));
