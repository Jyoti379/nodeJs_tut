const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ProductOrder = sequelize.define('product-order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = ProductOrder;