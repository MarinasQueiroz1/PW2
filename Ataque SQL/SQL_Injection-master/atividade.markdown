# Login Seguro em Node.js

Este projeto demonstra um exemplo prático de login seguro utilizando Node.js com MySQL, protegendo contra dois tipos comuns de ataque:

- SQL Injection
- Ataques de Força Bruta

---

## 🔐 Segurança Implementada

### 1. SQL Injection

**O que é:**  
Ataque que explora falhas na construção de comandos SQL, permitindo que o invasor injete ou altere comandos no banco.

**Como era vulnerável:**

```javascript
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
```

**Correção aplicada:**

```javascript
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE username = ?',
  [username]
);
```

**Por que funciona:**  
`execute` usa *prepared statements*, que impedem a injeção de SQL ao separar comandos e dados.

---

### 2. Força Bruta

**O que é:**  
Ataques que tentam várias combinações de login até encontrar uma válida.

**Correção aplicada:**

```javascript
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas. Tente novamente mais tarde.'
});
```

**Por que funciona:**  
Limita tentativas de login por IP, dificultando ataques automatizados.

---

### 3. Armazenamento Seguro de Senhas

**Correção aplicada:**

```javascript
const match = await bcrypt.compare(password, user.password);
```

**Por que funciona:**  
Senhas são armazenadas com hash. Mesmo que o banco vaze, os dados estão protegidos.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express
- MySQL2
- Bcrypt
- Express-rate-limit