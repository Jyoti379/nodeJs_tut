const express = require('express');

const userController = require('../controllers/User');

const router = express.Router();

router.post('/add-user', userController.postUser);
router.get('/get-user', userController.getUser);
router.delete('/delete-user/:id',userController.deleteUser)

module.exports = router;
