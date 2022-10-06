const path = require('path');
const rootDir = require('../util/path');


exports.getContact=(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactUs.html'));
  }

  exports.postContact=(req, res, next) => {
    console.log(req.body);
    
    res.redirect('/');
  }