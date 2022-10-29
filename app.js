const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/user');
const errorController = require('./controllers/error');


const sequelize = require('./util/database');
const cors=require('cors');
//const User=require('./controllers/user');





const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes   = require('./routes/user')
const { json } = require('sequelize');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes);


app.use(cors());

app.post('/user/add-user',userController.addUser);
app.get('/user/get-users',userController.getUser);
app.delete('/user/delete-user/:id',userController.deleteUser);
app.put('/user/edit-user',userController.editUser);



app.use(errorController.get404);


sequelize
.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
    })
.catch(err => {
    console.log(err);
    })


