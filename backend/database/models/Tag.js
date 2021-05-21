const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.ENUM('#FBADFF', '#79ADDC', '#FFC09F', '#FFEE93', '#ADF7B6','#DCB6D5', '#F2F7F2'),
            defaultValue: '#F2F7F2',
        }
    });
};