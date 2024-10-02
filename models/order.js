const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

module.exports = Order;
