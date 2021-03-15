const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Token not found");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.username = user;
        next();
    })
};

module.exports = { authenticateJWT };