

const express = require('express');


const successController=require('../controller/success1');
const router = express.Router();

router.get('/success',successController.getSuccess );

module.exports = router;