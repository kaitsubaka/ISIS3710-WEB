const {Model, DataTypes} = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
    {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ts: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
    sequelize
    }
);
Message.sync();
module.exports = Message;