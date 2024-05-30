const db = require('../db/connect');   
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginAuth = async(req, res) => {
    
    const { username, password } = req.body;


    // Checking if the username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Checking if the user exists in the database
    const checkUserExists = 'SELECT * FROM users WHERE username = ?';


    db.query(checkUserExists, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // If the user with the provided username doesn't exist
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }
        

        //Getting the hashed pasword
        const getHashedPassword = 'SELECT user_password FROM users WHERE username = ? LIMIT 1';

        db.query(getHashedPassword,[username], async(err, results)=>{
            
            if(err){
                return res.status(500).json({ error: 'Internal server error.' });

            }
            if(await bcrypt.compare(password, results[0].user_password)){
                
                // Generate a JWT token and send it as a response
                const token = jwt.sign({ username: username, role: 'admin' }, process.env.JWT_SECRET, { 
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                

                return res.status(200).json({
                    status: "successful",
                    token: token,
                    message: "User Successfully logged in"
                });
            }
            else{

                // Password didn't match
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized"
                });
            }

        });


    });
     
};


const signup = (req, res) => {

    const { username, useremail, password } = req.body;

    // Check if the username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the username is already taken
    const checkUserSql = 'SELECT * FROM users WHERE username = ?';

    
    db.query(checkUserSql, [username], async(err, results) => {
        if (err) {
            return res.status(500).json({ error: 'bada beem' });
        }

        // If the username is already taken
        if (results.length > 0) {
            return res.status(409).json({ error: 'Username is already taken.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserSql = 'INSERT INTO users (username, user_email, user_password) VALUES (?, ?, ?)';
        db.query(insertUserSql, [username, useremail, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'bada boom' });
            }

            return res.status(201).json({ message: 'User created successfully.' });
        });
    }); 
}


module.exports = {loginAuth, signup};

