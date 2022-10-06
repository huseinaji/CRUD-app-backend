const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  token: DataTypes.STRING
})

const Transaction = db.define('transaction', {
  name: DataTypes.STRING,
  date: DataTypes.DATE
})

User.hasOne(Transaction);
Transaction.belongsTo(User);

module.exports = { User, Transaction };

(async () => {
  await db.sync();
})()