const express = require('express');
const sequelize = require("./config/connection.js")
const session = require("express-session");
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

// Requiring our models for syncing
const {User,Post} = require('./models');
const routes = require("./controllers");

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));


// Sets up the Express app to handle data parsing

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 2
    },
    store: new SequelizeStore({
        db:sequelize
    })
}))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes)

sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});