const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); 

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ocupation: {
            type: DataTypes.STRING
        }, 
        phone: { 
            type: DataTypes.STRING
        }, 
        gender: {
            type: DataTypes.ENUM("male", "female", "other")
        },
        profile_photo: {
            type: DataTypes.JSON,
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash);
            }
        }
    });
};
