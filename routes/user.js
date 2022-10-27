const express = require('express');

const userController = require('../controllers/User');

const router = express.Router();

router.post('/add-user', userController.postUser);
router.get('/get-user', userController.getUser);

module.exports = router;
