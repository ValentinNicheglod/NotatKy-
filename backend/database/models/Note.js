const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('note', {
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
/*      color: {
            type: DataTypes.STRING,
            defaultValue: 'white',
        },
        reminder: {
            type: DataTypes.DATE
        }, */
        state: {
            type: DataTypes.ENUM("archive", "main-dashboard", "trash")
        }
    });
};