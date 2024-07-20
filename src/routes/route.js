const express = require('express')

const router = express.Router()
const taskController = require("../controller/taskControllers")
const userController = require("../controller/userControllers")
const middleware = require("../middleware/auth");
const passport = require('passport');
const jwt=require('jsonwebtoken')

const secretKey = "./K4lp3d*((secretKEY($#//"


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

// Update status of a specific task by ID
router.put("/tasks/status/:taskId",middleware.auth, taskController.updateTaskStatus) 

// Delete a specific task by ID
router.delete('/tasks/:taskId',middleware.auth, taskController.deleteTask);




// ==== User APIs ====

// Create a new user
router.post('/users', userController.createUser);

// User login
router.post('/login', userController.userLogin);

// Token validation
router.get('/token-validation', middleware.auth, userController.tokenValidation);


// Goole Login Routes
router.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failure' }),
  (req, res) => {
    const user = req.user;
    let token = jwt.sign({
        id: user._id,
        email: user.email
      }, secretKey, { expiresIn: '1day' });


      res.cookie('token', token)
    const userData = encodeURIComponent(JSON.stringify(user._id)); 
    res.redirect(`http://localhost:3001/dashboard?user=${userData}`); 
  }
);


router.get('/login-failure', (req, res) => {
  res.send('Login unsuccessful. Try again later.');
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
      });

    // Clear cookies and session storage
    res.clearCookie('token'); // Clear the token cookie
    res.clearCookie('connect.sid'); // Clear the session cookie if using express-session
  
   
});

module.exports = router