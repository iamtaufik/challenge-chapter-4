const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser } = require('../controllers/users.controller');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);

module.exports = router;
