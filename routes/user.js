const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/add-user',userController.addUser);
router.get('/get-users',userController.getUser);
router.delete('/delete-user',userController.deleteUser);


module.exports = router;