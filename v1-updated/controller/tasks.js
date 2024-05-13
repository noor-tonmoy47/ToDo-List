const getAlltasks = (req, res)=>{
    res.status(200).json({message: "Getting all tasks"});
}

const createTask = (req, res) =>{
    
    res.status(201).json({message: "Creating tasks"});
}


const updateTask = (req, res) =>{
    res.status(200).json({message: "updating task"});
    
}

const deleteTask = (req, res) =>{
    
    res.status(204).json({message: "deleting tasks"});
}

module.exports = {getAlltasks , createTask, updateTask, deleteTask};