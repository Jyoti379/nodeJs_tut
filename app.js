const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const userController = require('./controllers/User');
const sequelize = require('./util/database');
const User =require("./models/user");
var cors = require('cors');




const app = express();
app.use(cors());
app.use(User);

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes);

app.post('/user/add-user',async(req,res,next)=>{
    try{
  
        /*if(!req.body.number){
            throw new Error('Phone Number is mandatory');
        }
        if(!req.body.email){
            throw new Error('email is mandatory');
        }*/
       
    const name=req.body.name;
    const email=req.body.email;
    const phonenumber=req.body.number;
    const data= await User.create({name:name,email:email,phonenumber:phonenumber});
    res.status(201).json({newUserDetail:data});
  }catch(err){
    res.status(500).json({error:err})
  }
})

app.get('/user/get-users',async(req,res,next)=>{
    try{
  
    const users=await User.findAll();
    res.status(200).json({allUsers:users});
  }catch(err){
    console.log('user fails',JSON.stringify(err));
    res.status(500).json({error:err})
  }
  })

  app.delete('/user/delete-user/:id',async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('ID missing');
            return res.status(400).json({err:'id missing'})
        }
        const uId=req.params.id;
        await User.destroy({where:{id:uId}});
        res.status(200);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
  })

app.use(errorController.get404);
//app.use(userController.getUser);

sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
    })
.catch(err => {
    console.log(err);
    })


