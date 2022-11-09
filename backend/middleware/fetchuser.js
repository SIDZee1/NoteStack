var jwt = require('jsonwebtoken');
const jwtSecret = 'plotterjotter:plotyourthoughts';

const fetchuser = (req, res, next) =>{
    const token = req.header("auth-token");
    // console.log(token)
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token."})
    }

    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Internal Server Error."})
    }
}

module.exports = fetchuser;