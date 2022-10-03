const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.send(
    '<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" name="username" placeholder="username"><button type="submit">login</button></form>'
  );
});

router.post('/login', (req, res) => {
 console.log(req.body);
  
  res.redirect('/');
});

module.exports = router;