const path = require('path');

const express = require('express');

const contactController=require('../controller/contacts')

const router = express.Router();

// /admin/add-product => GET
router.get('/contactUS',contactController.getContact );

// /admin/add-product => POST
router.post('/contactUs',contactController.postContact );

module.exports = router;