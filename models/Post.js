const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init({
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false,
    }
},{
    sequelize, 
});

module.exports=Pet