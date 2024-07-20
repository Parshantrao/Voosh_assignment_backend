const express = require('express')

const router = express.Router()
const taskController = require("../controller/taskControllers")
const userController = require("../controller/userControllers")
const middleware = require("../middleware/auth");

router.get("/get", (req, res) => {
    res.status(200).send({ message: "Working" })
})

// ==== Task APIs ====

// Create a task
router.post('/tasks', middleware.auth, taskController.createTask);

// Get all tasks
router.get('/tasks/:userId',middleware.auth, taskController.getTasks);

// Update a specific task by ID
router.put('/tasks/:taskId',middleware.auth, taskController.updateTask);

// Delete a specific task by ID
router.delete('/tasks/:taskId',middleware.auth, taskController.deleteTask);




// ==== User APIs ====

// Create a new user
router.post('/users', userController.createUser);

// User login
router.post('/login', userController.userLogin);

// Token validation
router.get('/token-validation', middleware.auth, userController.tokenValidation);


module.exports = router