const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const secretkey = "plutoniumFunctionup$%(())()*)+/";
        let token = req.headers["x-api-key"];
        if (!token) {
            return res
                .status(401)
                .send({ status: false, msg: "Please provide a token" });
        }
        
        jwt.verify(token, secretkey, (err, result) => {
            if (err) return res.status(401).send(err.message);
            req["x-api-token"] = result;
            next();
        });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}