const express = require('express');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuarios'
};

// Limite de requisições por IP para mitigar força bruta
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 5, // Máximo de 5 tentativas por IP
  message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Evita SQL Injection com prepared statements
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).send('Credenciais inválidas');
    }

    const user = rows[0];

    // Senhas devem ser armazenadas com hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Credenciais inválidas');
    }

    res.send('Login bem-sucedido');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  } finally {
    connection.end();
  }
});

app.listen(3000);
