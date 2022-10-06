const { User, Transaction } = require('../models/UserModels')
const { createToken } = require('../config/token');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    try {
      const { name, email, role } = req.body
      const token = await createToken({ name, email, role });
      const checkData = await User.findAll({ where: { email: email } });

      if (checkData != '') {
        await User.update({ token: token, role: role }, { where: { email: email } });
      } else {
        await User.create({ name, email, role, token });
      }
      res.send({
        msg: 'login success',
        token: token
      })
    } catch (error) {
      console.log(error)
    }
  },

  getAllData: async (req, res) => {
    try {
      const result = await Transaction.findAll();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  },

  createTransaction: async (req, res) => {
    try {
      const { name, userId } = req.body;
      const date = new Date().toISOString();
      await Transaction.create({ name, date, userId });
      res.send({
        msg: 'transaction success'
      })
    } catch (error) {
      console.log(error)
    }
  },

  readAllTransaction: async (req, res) => {
    try {
      const dataUser = await User.findAll({ where: { email: req.dataToken.email } })
      const result = await Transaction.findAll({ where: { userId: dataUser[0].id } });
      const dateNow = new Date().getDate();
      const OneDay = result.filter((n) => n.date.getDate() === dateNow);
      // console.log(OneDay.length);
      if (req.dataToken.role == 'admin') {
        return res.send({
          msg: 'success',
          data: result,
          totalTransaction: result.length
        });
      }
      if (req.dataToken.role == 'guest') {
        return res.send({
          msg: 'success',
          totalTransaction: OneDay.length
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  updateTransaction: async (req, res) => {
    try {
      // console.log(req.dataToken);
      const { name, userId } = req.body;
      const updateDate = new Date().toISOString();
      // console.log(req.dataToken.role);
      if (req.dataToken.role == 'guest') {
        return res.status(400).send({
          msg: 'Role bukan admin',
        });
      }
      await Transaction.update({ name, updateDate, userId }, { where: { id: req.params.id } })
      const data = await Transaction.findAll({ where: { id: req.params.id } })
      return res.send({
        msg: 'transaction updated',
        data: data
      })
    } catch (error) {
      console.log(error);
    }

  },

  deleteTransaction: async (req, res) => {
    try {
      if (req.dataToken.role == 'guest') {
        return res.status(400).send({
          msg: 'Role bukan admin',
        });
      }
      await Transaction.destroy({ where: { id: req.params.id } })
      res.send({
        msg: 'transaction deleted'
      })
    } catch (error) {
      console.log(error);
    }
  },

  filterTransaction: async (req, res) => {
    try {
      const filterDate = new Date(req.query.date);
      const date = filterDate.getDate();
      const month = filterDate.getMonth();
      const year = filterDate.getFullYear();

      const dataUser = await User.findAll({ where: { email: req.dataToken.email } })
      // console.log(dataUser[0].id)
      const transData = await Transaction.findAll({ where: { userId: dataUser[0].id } })
      // console.log(transData)
      // console.log(req.query.date == '');
      if (req.query.name == '' && req.query.date == '') {
        return res.send({
          status: 'success',
          data: transData
        })
      }
      if (req.query.name != '' && req.query.date != '') {
        const filterData = transData.filter((n) => {
          return n.date.getDate() === date
            && n.date.getMonth() === month
            && n.date.getFullYear() === year
            && n.name === req.query.name
        })
        return res.send({
          status: 'success',
          data: filterData
        });
      } else if (req.query.name == '') {
        const filterData = transData.filter((n) => {
          return n.date.getDate() === date
            && n.date.getMonth() === month
            && n.date.getFullYear() === year
        })
        return res.send({
          status: 'success',
          data: filterData
        });
      } else if (req.query.date == '') {
        const filterData = transData.filter((n) => {
          return n.name = req.query.name
        })
        return res.send({
          status: 'success',
          data: filterData
        });
      }
      

    } catch (error) {
      console.log(error);
    }
  }
}