const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');



const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


app.post('/register', (req, res) => {
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  console.log('Register attempt:', { email, password }); 
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('DB Error:', err); 
      return res.status(500).send('DB Error');
    }
    if (results.length > 0) {
      return res.status(409).send('User already exists');
    }
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
      console.log('Insert query:', sql, [email, password]); 
      db.query(sql, [email, password], (err2, result) => {
      if (err2) {
        console.error('DB Error:', err2); 
       return res.status(500).send('DB Error');
      }
        console.log('Insert result:', result); 
        res.send('User registered!');
    });
  });
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'm0554009306@', 
  database: 'registration_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


app.post('/login', (req, res) => {
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).send('DB Error');
    
    console.log('Login attempt:', { email, password });
    if (results.length > 0) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});