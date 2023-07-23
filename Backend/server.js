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


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token given.', tokeen: token});
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
        const token = jwt.sign({username: username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token : token });
  
        
      });
    });