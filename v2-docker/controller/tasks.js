
const db = require('../db/connect');
const jwt = require('jsonwebtoken');


const getAlltasks = async(req, res)=>{


    const authHeader = req.headers['authorization'];
    
    const token = authHeader.split(' ')[1];
    
    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ error: 'Not Authorized.'});
    }
    

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


        // Insert the new list into the database
        const getItems = 'SELECT task_ID, content from lists WHERE username = ?';
        db.query(getItems, [decodedToken.username], (err, results) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            // return res.status(200).json(results);
            return res.status(200).json({
                status: "success",
                result: results
            });
        });
    } catch (err) {
        // Handle JWT verification error (invalid token)
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ error: 'Invalid token.' });
    }
}

const createTask = (req, res) =>{
    
    const {task} = req.body;

    const authHeader = req.headers['authorization'];
    
    const token = authHeader.split(' ')[1];

    // Check if the token and task are provided
    if (!token || !task) {
        return res.status(400).json({ error: 'Token and task are required.' });
    }

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


        // Avoiding duplicate tasks

        const checkTask = 'SELECT * FROM lists WHERE username = ? AND content = ?';

        db.query(checkTask, [decodedToken.username, task], (err, results)=>{
            if(err){
                return res.status(500).json({ 
                    status: "failed",
                    error: 'Internal server error' 
                });
            }
            if(results.length > 0){
                return res.status(409).json({
                    status: "Conflict",
                    message: "This task already exists"
                });
            }

            // Inserting new task

            const insertListSql = 'INSERT INTO lists (username, content) VALUES (?, ?)';
    
            db.query(insertListSql, [decodedToken.username, task], (err) => {
                if (err) {
                    return res.status(500).json({ 
                        status: "failed",
                        error: 'Internal server error' 
                    });
                }
    
                return res.status(201).json({ 
                    status: 'success',
                    message: 'Task created successfully.' 
                });
            });
        })
    } catch (err) {
        // Handle JWT verification error (invalid token)
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ 
            status: 'failed',
            message: 'Unauthorized' 
        });   
    }
}


const updateTask = (req, res) =>{
    res.status(200).json({message: "updating task"});
    
}

const deleteTask = (req, res) =>{
    
    const {task} = req.body;

    const authHeader = req.headers['authorization'];
    
    const token = authHeader.split(' ')[1];

    // Check if the token and listId are provided
    if (!token || !task) {
        return res.status(400).json({ 
            status: 'Bad Request',
            message: 'Token and task are required'
        });    
    }

    try {
        // Verify the token to get the user information
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;


        // Check if the list with the given listId belongs to the user
        const checkListSql = 'SELECT content FROM lists WHERE content = ? AND username = ?';

        db.query(checkListSql, [task, username], (err, results) => {
            if (err) {
                return res.status(500).json({ 
                    status: "failed",
                    error: "Internal server error"
                });            
            }

            // If the list with the given listId doesn't exist or doesn't belong to the user
            if (results.length === 0) {
                return res.status(404).json({ 
                    status: "Not Found",
                    message: "Task Not Found" 
                });            
            }

            // Delete the list from the database
            const deleteListSql = 'DELETE FROM lists WHERE content = ? AND username = ?';

            db.query(deleteListSql, [task, username], (err, results) => {
                if (err) {
                    return res.status(500).json({ 
                        status: "failed",
                        error: "Internal server error"
                    });              
                }

                return res.status(200).json({ 
                    status: "success",
                    message: "Task deleted" 
                });
            });
        });
    } catch (err) {
        // Handle JWT verification error (invalid token)
        return res.status(401).json({ 
            status: "failed",
            message: "Unauthorized"
        });
}}

module.exports = {getAlltasks , createTask, updateTask, deleteTask};