const jwt = require("jsonwebtoken");
const secretKey = "./K4lp3d*((secretKEY($#//"

async function auth(req, res, next) {
    try {
        let  token = req.cookies.token;
        //  token = req.headers["Authorization"];
        if (!token) {
            return res
                .status(401)
                .send({ status: false, message: "Token is missing in header" });
        }
        
        jwt.verify(token, secretKey, (err, result) => {
            if (err) return res.status(401).send(err.message);
            req["decodedToken"] = result;
            next();
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports={
    auth
}