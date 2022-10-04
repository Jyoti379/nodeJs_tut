

const express = require('express');

//const rootDir = require('../util/path');

const router = express.Router();

router.get('/success', (req, res, next) => {
   res.send('<h1>successfully filled</h1>');
   // res.sendFile(path.join(__dirname,'../', 'views', 'success.html'));
});

module.exports = router;