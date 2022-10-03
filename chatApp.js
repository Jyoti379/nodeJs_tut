const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    fs.readFile('username.txt',(err,data)=>{
      if(err){
        console.log(err)
        data='No Data Exists'
      }
      res.send(`${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"  method="POST">
      <input type="text" id="message" name="message" placeholder="message">
      <input type="hidden" name="username" id="username">
      <button type="submit">send</button></form>`);
    })
  
   
  });
  app.post('/', (req, res) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>
    err? console.log(err):res.redirect('/')
    )
   }
   
   );

  app.get('/login', (req, res) => {
    res.send(
      '<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" name="username" placeholder="username"><button type="submit">login</button></form>'
    );
  });
  app.post('/login', (req, res) => {
    console.log(req.body);
     
     res.redirect('/');
   });
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})
app.listen(3000);