var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  port:3307,
  user: "root",
  password: "password",
  database: "digitallibrary"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});


module.exports = con;
