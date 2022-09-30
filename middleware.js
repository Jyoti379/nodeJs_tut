const http = require('http');
const express= require('express');
const bodyParser=require('body-parser')
const app= express();
app.use(bodyParser.urlencoded({extended:false}))
/*app.use('/',(req,res,next)=>{

   console.log("this always runs!") 
   next();//this allows the request to continue to the next middleware
})*/

app.use('/add-product',(req,res,next)=>{
   // console.log("in the middleware")
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form>')
    app.post('/product',(req,res,next)=>{
        console.log(res.body)
        res.redirect('/')
    })
   // next();//this allows the request to continue to the next middleware
})
app.use('/',(req,res,next)=>{
   // console.log("in another  middleware")
    res.send('<h1>Hello from Express!</h1>')
})
const server = http.createServer(app);

server.listen(3000);