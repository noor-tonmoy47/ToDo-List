const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

// Creating an instance of Express
const app = express();

// port of server
const port = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// for access control alow origin
app.use(cors());

// importing database and jwt functions
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tonu',
    password: 'tonu69',
    database: 'todo_app',
});

// Secret key for JWT
const secretKey = 'surma';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token given.', tokeen: token });
        }
        req.user = decoded;
        next();
    });
}


app.post('/api/login', (req, res) => {
    console.log("1")
    const { username, password } = req.body;


    // Checking if the username and password are provided
    if (username.length === 0 || password === 0) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    console.log("1")

    // Checking if the user exists in the database
    const sql = 'SELECT * FROM users WHERE User_Name = ? AND User_Password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // If the user with the provided username doesn't exist
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }


        //Generate a JWT token and send it as a response
        const token = jwt.sign({ username: username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token: token });


    });
});


app.post('/api/signup', (req, res) => {
    const { username, useremail, password } = req.body;

    // Check if the username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Check if the username is already taken
    const checkUserSql = 'SELECT * FROM users WHERE User_Name = ?';
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // If the username is already taken
        if (results.length > 0) {
            return res.status(409).json({ error: 'Username is already taken.' });
        }

        // Insert the new user into the database
        const insertUserSql = 'INSERT INTO users (User_Name, User_Email, User_Password) VALUES (?, ?, ?)';
        db.query(insertUserSql, [username, useremail, password], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(201).json({ message: 'User created successfully.' });
        });
    });
});


app.post('/api/createlist', (req, res) => {
    const { token, itemName, id } = req.body;

    // Check if the token and listName are provided
    if (!token || !itemName) {
        return res.status(400).json({ error: 'Token and item name are required.' });
    }

    try {

        const decodedToken = jwt.verify(token, secretKey);


        // Insert the new list into the database
        const insertListSql = 'INSERT INTO lists (userName, content, id) VALUES (?, ?, ?)';
        db.query(insertListSql, [decodedToken.username, itemName, id], (err, results) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            return res.status(201).json({ message: 'Task created successfully.' });
        });
    } catch (err) {
        // Handle JWT verification error (invalid token)
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ error: 'Invalid token.' });
    }
});


app.delete('/api/deleteList', (req, res) => {
    const { token, itemId } = req.body;

    // Check if the token and listId are provided
    if (!token || !itemId) {
        return res.status(400).json({ error: 'Token and item ID are required.' });
    }

    try {
        // Verify the token to get the user information
        const decodedToken = jwt.verify(token, secretKey);
        const username = decodedToken.username;


        // Check if the list with the given listId belongs to the user
        const checkListSql = 'SELECT content FROM lists WHERE id = ? AND userName = ?';
        db.query(checkListSql, [itemId, username], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error.' });
            }

            // If the list with the given listId doesn't exist or doesn't belong to the user
            if (results.length === 0) {
                return res.status(404).json({ error: 'Task not found.' });
            }

            // Delete the list from the database
            const deleteListSql = 'DELETE FROM lists WHERE id = ?';
            db.query(deleteListSql, [itemId], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error.' });
                }

                return res.status(200).json({ message: 'Task deleted successfully.' });
            });
        });
    } catch (err) {
        // Handle JWT verification error (invalid token)
        return res.status(401).json({ error: 'Invalid token.' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});