var con = require('../config/db_conn');

module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(p, id){
    var storedItem = this.items[id];
    if(!storedItem){
      storedItem = this.items[id] = {item: p, qty: 0, unitprice: 0 };
    }
    storedItem.qty++;
    storedItem.unitprice = p.unitprice * storedItem.qty;
    this.totalQty++;
    this.totalPrice += p.unitprice;
    };
  this.generatedArray = function(){
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
  this.reduceByOne = function(id) {
      this.items[id].qty--;
      this.items[id].unitprice -= this.items[id].item.unitprice;
      this.totalQty--;
      this.totalPrice -= this.items[id].item.unitprice;

      if (this.items[id].qty <= 0){
        delete this.items[id];
      }
  };
  this.removeItem = function(id) {
    this.totalQty -= this.items[id].item.qty;
    this.totalPrice -= this.items[id].unitprice;
    delete this.items[id];
  };
  this.SaveOrder = function(user, cart){
    var orderQuery = 'insert into orders(userid, orderdate, address, name) values (?,?,?,?)';
    var orderdate = new Date();
    orderdate = orderdate.getFullYear() + '-' + (orderdate.getMonth() + 1) + '-' + orderdate.getDate();
    con.query(orderQuery, [user.id, orderdate, 'address', user.username], function(err, results,fields){
      if (err) throw err;
      console.log('order inserted');
      for(var id in cart.items) {
        console.log(id);
        console.log(cart.items[id].unitprice);
        console.log(cart.items[id].qty);
        var orderDetailsQuery = 'insert into order_details(orderid,productid,unitprice,qty) values(?,?,?,?)';
        con.query(orderDetailsQuery, [results.insertId, id, cart.items[id].unitprice, cart.items[id].qty], function(err, results,fields){
          if (err) throw err;
          console.log('order detail inserted');
        });
      };
    });
  };
};
