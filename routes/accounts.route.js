const express = require('express');
const router = express.Router();
const { createAccount, getAccountById, deleteAccount, getAccounts, updateAccount } = require('../controllers/accounts.controller');

router.post('/', createAccount);
router.get('/', getAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;
