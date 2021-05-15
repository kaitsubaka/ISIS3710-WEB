const { Sequelize } = require('sequelize')


const sequelize = new Sequelize("database", "", "", {
    dialect: "sqlite",
    storage: "./database/databse.sqlite",
});

sequelize.authenticate().then(() => { console.log("Auth done!"); }).catch(console.log);

module.exports = sequelize