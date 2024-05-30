const express = require('express');

const router = express.Router();


const {
    all,
    getAlltasks, 
    createTask, 
    updateTask, 
    deleteTask
} = require('./../controller/tasks');



router.route('/').get(getAlltasks).post(createTask);

router.route('/:taskID').patch(updateTask).delete(deleteTask);

//get(/api/v1/tasks)   - ->  get all tasks

//post(/api/v1/tasks)   -->  create new task

//patch(/api/v1/tasks/:id)   -->  update single task

//delete(/api/v1/tasks/:id)   -->  delete single task

module.exports = router;