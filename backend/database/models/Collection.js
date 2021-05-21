const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('collection', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        }
    });
};