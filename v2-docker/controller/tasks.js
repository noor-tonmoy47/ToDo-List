
const db = require('../db/connect');
const jwt = require('jsonwebtoken');


const all = async(req, res)=>{
    // const getAllSql = 'SELECT 5 * 5';
    
    // try {
    //     const result = await pool.query(getAllSql);

    //     return res.status(200).json({
    //         status: "Successful",
    //         data:{
    //             data: result
    //         }
    //     });
    // } catch (error) {
    //     return res.status(404).json({
    //         status: "failed",
    //         data:{
    //             data: err
    //         }
    //     });
    // }
}

const getAlltasks = async(req, res)=>{

    // const getAllSql = 'SELECT 5 * 5';
    
    // try {
    //     const result = await pool.query(getAllSql);

    //     return res.status(200).json({
    //         status: "Successful",
    //         data:{
    //             data: result
    //         }
    //     });
    // } catch (error) {
    //     return res.status(404).json({
    //         status: "failed",
    //         data:{
    //             data: err
    //         }
    //     });
    // }
}

const createTask = (req, res) =>{
    
    const { token, task} = req.body;

    // Check if the token and listName are provided
    if (!token || !task) {
        return res.status(400).json({ error: 'Token and task are required.' });
    }

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);


        // Insert the new list into the database
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
    
    res.status(204).json({message: "deleting tasks"});
}

module.exports = {all, getAlltasks , createTask, updateTask, deleteTask};