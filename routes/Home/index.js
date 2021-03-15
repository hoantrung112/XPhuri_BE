const router = require('express').Router();
const { authenticateJWT } = require('../../middlewares/auth/auth');

router.get('/', (req, res) => {
    res.send('Home page!');
});

router.get('/resources', authenticateJWT, (req, res) => {
    res.send('Resources!');
    res.json({
        player: req.username
    })
})

module.exports = router;