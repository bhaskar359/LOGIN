const express = require('express');
const mysql = require("mysql");
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 3000 || 3306;

app.use(bodyParser.urlencoded({extended : false}))

app.use(bodyParser.json());

app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine','hbs');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

pool.getConnection((err,connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
});

const routes = require('./server/routes/user');

app.use('/',routes);

app.listen(port,() => console.log(`Listening on port ${port}`));