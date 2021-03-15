const jwt = require('jsonwebtoken');
const Player = require('../models/Player');


const generateToken = (username) => {
    return jwt.sign({ username }, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: 20,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
};

const register = (firstName, lastName, username, email, password) => {
    const player = new Player({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
    });
    player.generatePassword(password);
    console.log(player);
    return player.save();
};

const login = (username, password) => {
    return Player.findOne({ username: username })
        .exec()
        .then((player) => {
            if (!player.isPasswordMatched(password)) {
                throw new Error('Incorrect password!');
            }
            return {
                player: player._doc,
                jwt: generateToken(username),
            };
        }).catch((err)=>{
            throw new Error("Incorrect username!");
        });
};

module.exports = { register, login, verifyToken };