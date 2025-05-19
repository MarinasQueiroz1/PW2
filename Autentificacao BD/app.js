const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

//Configuração do express-handlebars
app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'aula'
});

conexao.connect(function(erro){
    if (erro) throw erro;
    console.log("Conectado no banco de dados!");
});

app.get('/',function(req,res){
    res.render('formulario');
});

app.post('/login',function(req,res){
    let nome = req.body.nome;
    console.log(req.body);
    res.write('sadfsadf');
    let sql = "SELECT * FROM `usuario` WHERE `e-mail`='teste@teste.com'";
    let sql2 = "SELECT * FROM `usuario` WHERE `senha`='12345'";
    conexao.query(sql, function(erro, retorno){
        res.render('formulario',{listagem:retorno});
    });

    res.end();

    
});

