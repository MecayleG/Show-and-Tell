const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const Show = require('./show-tell')

// app flash setups 


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


const pg = require('pg');
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://amirah:coder123@localhost:5432/show_sql';
const pool = new Pool({
    connectionString
});
const fruits = Show(pool)

app.get("/", async function (req, res) {
    res.render("index", {

    });
});
app.get("/fruit_name", async function (req, res) {
    const fruitName = req.query.fname;
    const returnedFruit = await fruits.insertFruit(fruitName)
    console.log(returnedFruit);
    res.render("index", {
        fruit_chosen: returnedFruit

    });
});
app.post("/fruit_name", async function (req, res) {
    const fruitName = req.body.fname;
    const returnedFruit = await fruits.insertFruit(fruitName)
    res.render("index", {
    });
});

var port = process.env.PORT || 3008;

//start everything up
app.listen(port, function () {
    console.log('App Started on port:', port);
});