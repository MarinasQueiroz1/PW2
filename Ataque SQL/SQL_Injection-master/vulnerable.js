const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios'
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send('Login bem-sucedido');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });
});

app.listen(3000);
