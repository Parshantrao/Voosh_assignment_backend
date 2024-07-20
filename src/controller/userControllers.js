const UserModel = require("../models/UsersModel");
const validator = require("../utils/validators");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const secretKey = "./K4lp3d*((secretKEY($#//"

const createUser = async function (req, res) {
    try {

        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Provide user's data" })
        }
        let { first_name, last_name, email, password } = req.body

        //   Validation for null and undefined values
        if (!validator.isValid(first_name)) {
            return res.status(400).send({ status: false, message: "first_name field is required" })
        }
        if (!validator.isValid(last_name)) {
            return res.status(400).send({ status: false, message: "last_name field is required" })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "email field is required" })
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password field is required" })
        }

        //   Validation for type string, email and password
        if (!validator.isValidString(first_name)) {
            return res.status(400).send({ status: false, message: "first_name field must contain a valid string" })
        }
        if (!validator.isValidString(last_name)) {
            return res.status(400).send({ status: false, message: "last_name field must contain a valid string" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid email" })
        }
        if (!validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false, message: "Password must contain uppercases,lowercase,special characters and numerics, length 8-19.",
            });
        }

        const existedUser = await UserModel.findOne({ email }).lean()
        if (existedUser) {
            return res.status(400).send({ status: false, message: "Email already existed" })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).send({ status: false, message: err.message })
            }

            const data = await UserModel.create({ first_name, last_name, email, password: hash })

            return res.status(201).send({ status: true, message: "User created successfuly", data: data })
        });

    } catch (err) {
        console.error("Error saving data:", err.message);
        return res.status(500).send({ status: false, message: "Failed to save data", error: err.message });
    }
}

const userLogin = async function (req, res) {
    try {
        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Provide user's data." })
        }

        let { email, password } = req.body

        //   Validation for null and undefined values
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "email field is required." })
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password field is required." })
        }

        const existedUser = await UserModel.findOne({ email })
        if (!existedUser) {
            return res.status(404).send({ status: false, message: 'Email is not registered.' })
        }

        const passwordMatched = await bcrypt.compare(password, existedUser.password);

        if (passwordMatched) {
            let token = jwt.sign({
                id: existedUser._id,
                email: email
            }, secretKey, { expiresIn: '1day' });


            res.cookie('token', token)
            // .send({status: true, message: "Loged in successfuly"});

            return res.status(200).send({ status: true, message: "Logged in successfuly", data: existedUser._id })
        }
        else {
            return res.status(400).send({ status: false, message: "Invalid credentials" })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}

const tokenValidation = async function (req, res) {
    try {
        const decodedToken = req.decodedToken
        return res.status(200).send({ status: true, message: "Token is valid", data: decodedToken })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createUser, userLogin, tokenValidation }