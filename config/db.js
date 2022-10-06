const {Sequelize} = require('sequelize');

const db = new Sequelize('transaction', 'postgres', '12354', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

module.exports = db;