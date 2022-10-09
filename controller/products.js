const Product=require('../model/product');

const path = require('path');
const rootDir = require('../util/path');

exports.getAddProduct= (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  }

  exports.postAddProduct=(req, res, next) => {
    const product=new Product(req.body.title);
    product.save();
    //console.log(req.body);
    res.redirect('/');
  }

  exports.getProduct=(req, res, next) => {
     Product.fetchAll(products=>{
      console.log(products);
      res.sendFile(path.join(rootDir, 'views', 'shop.html')); 
     });
   
  }