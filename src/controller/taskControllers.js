const TaskModel = require("../models/taskModel")
const validator = require("../utils/validators")

// =========  create task handler ======== //
const createTask = async function (req, res) {
    try {

        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Not a valid request body" })
        }

        let { title, description, dueDate } = req.body

        //   Validation for null and undefined values
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: "title field is required" })
        }
        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, message: "description field is required" })
        }

        //   Validation for type string
        if (!validator.isValidString(title)) {
            return res.status(400).send({ status: false, message: "title field must contain a valid string" })
        }
        if (!validator.isValidString(description)) {
            return res.status(400).send({ status: false, message: "description field must contain a valid string" })
        }

        //   Validation for due date for task
        let date = new Date()

        // Adding data in database
        const data = await TaskModel.create({ title, description })

        return res.status(201).send({ status: true, message: "Data saved", data: data })
    }
    catch (err) {
        console.error("Error saving data:", err.message);
        return res.status(500).send({ status: false, message: "Failed to save data", error: err.message });
    }
}

// =========  get task details handler ======== //

const getTask = async function (req, res) {
    try {
        const savedData = await TaskModel.find({isDeleted:false}).lean()

        return res.status(200).send({status:true, message:"Saved Tasks", data:savedData})
    }
    catch (err) {
        console.error("Error saving data:", err.message);
        return res.status(500).send({ status: false, message: "Failed to save data", error: err.message });
    }
}

// =========  update task details handler ======== //

const updateTask = async function (req, res) {
    try {
        if(!validator.isValidRequestBody(req.body)){
            return res.status(400).send({ status: false, message: "Not a valid request body" }) 
        }

        let {title, description} = req.body
        const taskId = req.params.taskId;

        if(!validator.isValidObjectId(taskId)){
            return res.status(400).send({status:false, message:"Invalid task objectID"})
        }

        let dataToUpdate = {}

        if(title){
            if (!validator.isValidString(title)) {
                return res.status(400).send({ status: false, message: "title field must contain a valid string" })
            }
            dataToUpdate.title=title
        }
        if(description){
            if (!validator.isValidString(description)) {
                return res.status(400).send({ status: false, message: "description field must contain a valid string" })
            }
            dataToUpdate.description=description
        }

        let existedData = await TaskModel.findOne({_id:taskId,isDeleted:false})
        
        if(!existedData){
            return res.status(404).send({status:false,message:"Task not found"})
        }

        const updatedData = await TaskModel.findByIdAndUpdate(taskId,dataToUpdate,{new:true})

        return  res.status(200).send({status:true, message:"Task data updated successfuly", data:updatedData})

    }
    catch (err) {
        console.error("Error saving data:", err.message);
        return res.status(500).send({ status: false, message: "Failed to save data", error: err.message });
    }
}


// =========  delete task handler ======== //

const deleteTask = async function (req, res) {
    try {

        const taskId = req.params.taskId;

        if(!validator.isValidObjectId(taskId)){
            return res.status(400).send({status:false, message:"Invalid task objectID"})
        }

        const existedData = await TaskModel.findOne({_id:taskId,isDeleted:false})
        
        if(!existedData){
            return res.status(400).send({status:true, message:"Task not found"})
        }

        await TaskModel.findByIdAndUpdate(taskId, {isDeleted:true})

        return  res.status(200).send({status:true, message:"Task data deleted successfuly"})
    }
    catch (err) {
        console.error("Error saving data:", err.message);
        return res.status(500).send({ status: false, message: "Failed to save data", error: err.message });
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}