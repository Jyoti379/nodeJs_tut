const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/contactUS', (req, res, next) => {
  res.sendFile(path.join(__dirname,'../', 'views', 'contactUs.html'));
});

// /admin/add-product => POST
router.post('/contactUs', (req, res, next) => {
  console.log(req.body);
  
  res.redirect('/');
});

module.exports = router;