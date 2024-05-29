
const pool = require('../db/connect');

const all = async(req, res)=>{
    const getAllSql = 'SELECT 5 * 5';
    
    try {
        const result = await pool.query(getAllSql);

        return res.status(200).json({
            status: "Successful",
            data:{
                data: result
            }
        });
    } catch (error) {
        return res.status(404).json({
            status: "failed",
            data:{
                data: err
            }
        });
    }
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

const createTask = async (req, res) =>{
    
    // try {

    //     console.log(req.body);
        
    //     const taskCreate = await Tasks.create(req.body);
        
    //     return res.status(201).json({
    //         status: "success",
    //         "data":{
    //             task: taskCreate
    //         }
    //     });
        
    // } catch (err) {
        
    //     res.status(400).json({
    //         status: "fail",
    //         message: err
    //     });
    // }
}


const updateTask = (req, res) =>{
    res.status(200).json({message: "updating task"});
    
}

const deleteTask = (req, res) =>{
    
    res.status(204).json({message: "deleting tasks"});
}

module.exports = {all, getAlltasks , createTask, updateTask, deleteTask};