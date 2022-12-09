const Product = require('../models/product');
const Cart = require('../models/cart');
const Order=require('../models/order');
const OrderItem = require('../models/orderItems');

exports.getProducts = (req, res, next) => {
  const page= +req.query.page|| 1;
  let totalItems;
  let Items_Per_page = 2;

  Product.count().then((total)=>{
    totalItems=total;
   return Product.findAll({
    offset:(page-1)*Items_Per_page,
    limit:Items_Per_page
   })
  })
 .then(products => {
      console.log(products)
      res.json({products:products,
       
        currentPage:page,
        hasNextPage:Items_Per_page * page < totalItems,
        nextPage:page+1,
        hasPreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(totalItems/Items_Per_page),

      })
     /* res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });*/
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
 
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts().then(products=>{
     res.status(200).json({success:true,products:products});
    }).catch(err=>{
      res.status(500).json({success:false,message:err});
    })
  }).catch(err=>{
    console.log(err)
  })
  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({success:true,message:"Successfully added the product"})
    })
    .catch(err =>res.status(500).json({success:false,message:"Error occured"}));
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {

      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder =(req,res,next)=>{
  let fetchedCart;
  req.user 
  .getCart()
     .then(cart => {
       fetchedCart=cart;
       return cart.getProducts();
     })
     .then(products=>{
      //console.log(products)
      return req.user
      .createOrder()
     .then(orders=>{
        return orders.addProducts(
          products.map(product=>{
            product.orderItems = {quantity:product.cartItem.quantity}
            return product
          })
        )
      })
     }).catch(err=>{
       console.log(err)
     })
     .then(result => {
      return fetchedCart.setProducts(null);
    })
     
   .then(() => {
       res.status(200).json({success:true,message:"Successfully Ordered"});
      
     })
     
   
    
     .catch(err=>{
     res.status(500).json({success:false,message:err})
     })
 
 }

exports.getOrders = (req, res, next) => {
  
  req.user.getOrders({include: ['products']})
  .then(Order=>{
   res.status(200).json({success:true,order:Order})
  }).catch(err=>{
    console.log(err)
  })
    
  
}


