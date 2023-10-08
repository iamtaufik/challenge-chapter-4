const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profiles.controller');

router.put('/:id', updateProfile);

module.exports = router;
