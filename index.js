const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
require('dotenv/config');

app.use(bodyParser.json());

const playerRoute = require('./routes/players');
const teamRoute = require('./routes/teams');
app.use('/players', playerRoute);
app.use('/teams', teamRoute);

app.get('/', (req, res) => {
    res.send('This is home page');
})

// DB Connection
mongoose.connect(
    process.env.DB_CONNECTION
    , {
        useNewUrlParser: true,
        useFindAndModify: false
    }
    , () => {
        console.log('Connected to DB!');
    });

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});