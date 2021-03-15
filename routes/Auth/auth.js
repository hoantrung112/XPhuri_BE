const router = require('express').Router();
// const Player = require('../../Models/Player');
// const crypto = require('crypto');
const { register, login } = require('../../services/auth');

router.post('/register', (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        register(firstName, lastName, username, email, password)
            .then((createdPlayer) => {
                res.json(createdPlayer);
                res.redirect('/auth/login');
            })
            .catch((err) => {
                res.status(400).json({
                    errorMessage: err.message
                });
            })
    } catch (err) {
        res.json({
            errorMessage: err.message
        })
        res.redirect('/register');
    }
})
router.get('/login', (req, res) => {
    res.send('login page');
})
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    login(username, password)
        .then((user) => {
            res.json(user);
            // res.redirect('/home');
        })
        .catch((err) => {
            res.status(401).json({ errorMessage: err.message });
        });
});

router.get('/logout',(req,res)=>{
    res.json({
        jwt:''
    });
});

module.exports = router;