const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },

}, { timestamps: true })

const UserModel = mongoose.models.Users || mongoose.model(Users, UserSchema)

module.exports = TaskModel