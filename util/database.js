const Sequelize =require('sequelize');

const sequelize =new Sequelize('node-complete','root','JyotiSQL876',{
    dialect:'mysql',
    host: 'localhost'
})

module.exports = sequelize;
