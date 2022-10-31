const path = require('path');
const sequelize = require('./util/database');
const cors = require('cors');


const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/user');
const expenseController=require('./controllers/expense');
const errorController = require('./controllers/error');

const Expense=require('./models/expense');



//const User=require('./controllers/user');





const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes   = require('./routes/user')
const expenseRoutes=require('./routes/expense');
const { json } = require('sequelize');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);


app.use(cors());

//user-table
app.post('/user/add-user',userController.addUser);
app.get('/user/get-users',userController.getUser);
app.delete('/user/delete-user/:id',userController.deleteUser);


//expense table
app.post('/expense/add-expense',expenseController.addExpenses);

app.get('/expense/get-expenses',expenseController.getExpenses)

app.delete('/expense/delete-expense/:id',expenseController.deleteExpense);





app.use(errorController.get404);


sequelize
.sync()
.then(result => {
     app.listen(3000);
    })
.catch(err => {
    console.log(err);
    })


