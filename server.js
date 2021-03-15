const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv/config');

app.use(express.json());
app.use(cors);

const homeRoute = require('./routes/Home/index');
const authRoute = require('./routes/Auth/auth');
const playerRoute = require('./routes/Player/players');
const teamRoute = require('./routes/Team/teams');
app.use('/home', homeRoute);
app.use('/auth', authRoute);
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