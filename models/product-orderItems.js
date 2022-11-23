const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const produtOrderItem = sequelize.define('product-orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = produtOrderItem;