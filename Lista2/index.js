const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');

const port = 3000;
const app = express();
const engine = mustacheExpress();
app.engine("mustache", engine);


app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "mustache");

app.use(express.urlencoded({ extended: true }))

const args = {
    pages: [
        { name: 'Home', link: 'home' },
        { name: 'Page1', link: 'page1' },
        { name: 'Login', link: 'login' },
    ]
};

app.get('/', (req, res) => {
    res.render('home', args);
});

app.get('/home', (req, res) => {
    res.render('home', args);
});

app.get('/page1', (req, res) => {
    res.render('page1', args);
});

app.get('/invertido', (req, res) => {
    //exemplo de rota http://localhost:3000/invertido?string=guilherme
    const stringInvertida = req.query.string.split('').reverse().join('');

    res.send('String da Query invertida: '+stringInvertida)
});

app.get('/login', (req, res) => {
    res.render('login', args);
});

app.post('/login', (req, res) => {
    const username = req.body.usuario; 
    const password = req.body.senha;

    if (password == (String(username)+String(username))) {
        res.send("Acesso Liberado!");
    } else {
        res.send("Acesso Negado!");
    }
});


app.listen(port, () => {
    console.log('Server na porta local 3000');
});
