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

app.post('/user/add-user',userController.postUser)

app.get('/user/get-users',userController.getUser)

  app.delete('/user/delete-user/:id',userController.deleteUser)

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


