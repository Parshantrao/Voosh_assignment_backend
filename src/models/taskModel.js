const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    isDeleted: {type: Boolean, default: false},
    dueDate: {type:Date, required:true},
    
}, { timestamps: true })

const TaskModel = mongoose.models.Tasks || mongoose.model(Tasks, TaskSchema)

module.exports = TaskModel