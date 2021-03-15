const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');

const whitelist = ["https://account.dwoom.com", "http://localhost:4200", "http://localhost:3001"]
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    enablePreflight: true
}

app.use(cors(corsOptions))

const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
})

mongoose.connection.on('disconnected', (err) => {
    console.log('Aplicação desconectada no banco de dados.')
})

mongoose.connection.on('connected', (err) => {
    console.log('Aplicação conectada ao banco de dados.')
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const indexRoute = require("./Routes/index");
const usersRoute = require("./Routes/users");
const categoriesRoute = require("./Routes/categories");
const itensRoute = require("./Routes/itens");


app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/categories', categoriesRoute);
app.use('/itens', itensRoute);


app.listen(3001);

module.exports = app;