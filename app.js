const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const cors=require('cors');
const User=require('./models/User');





const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const userRoutes   = require('./routes/user')
const { json } = require('sequelize');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(cors());

app.post('/user/add-user',async(req,res,next)=>{
    try{
    const name=req.body.name;
    const email =req.body.email;
    const phonenumber=req.body.phonenumber;

    const data=await User.create({name:name,email:email,phonenumber:phonenumber});
    res.status(201).json({newUserDetail:data});
    }catch(err){
        res.status(500).json({error:err});
    }
})
app.get('/user/get-users',async(req,res,next)=>{
    try{
        const users= await User.findAll();
        res.status(200).json({allUsers:users})
    }catch(err){
        console.log('get user is not working',JSON.stringify(err));
        res.status(500).json({error:err})
         }
  })
   app.delete('/user/delete-user/:id',async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('id is missing');
           return  res.status(400).json({error:'id is missing'});

        }
        const uId=req.params.id;
        await User.destroy({where:{id:uId}});
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({error:err})
    }
   })
    app.put('/user/edit-user',async(req,res,next)=>{
        try{
            const uId=req.params.id;
            const updatedName=req.body.name;
            const updatedEmail=req.body.email;
            const updatedNumber=req.body.phonenumber;
            const updatedUser= await findByPk(uId);
            users.name=updatedName;
            users.email=updatedEmail;
            user.phonenumber=updatedNumber
            await User.save();
        }catch(err){
            console.log('edit user not working');
            res.status(500).json({error:'edit user not working '})
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


