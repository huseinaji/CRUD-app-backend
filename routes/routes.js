const express = require('express');
const { readToken } = require('../config/token');
const { 
  login, 
  getAllData, 
  createTransaction, 
  deleteTransaction, 
  readAllTransaction, 
  updateTransaction,
  filterTransaction
} = require('../controllers/UserControllers');
const router = express.Router();

router.post('/login', login);
router.get('/user', getAllData);
router.post('/transaction', createTransaction);
router.get('/transaction', readToken, readAllTransaction);
router.delete('/transaction/delete/:id', readToken, deleteTransaction);
router.patch('/transaction/update/:id', readToken, updateTransaction);
router.get('/transaction/filter', readToken, filterTransaction);

module.exports = router;