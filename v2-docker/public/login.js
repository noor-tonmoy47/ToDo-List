//const { response } = require("express");

function toggleForm(formId) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (formId === 'loginForm') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else if (formId === 'signupForm') {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  }

  //Login

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // POST request to the server API to handle login
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
        
    })
    .then(response => response.json())
    .then(data => {
      if(data.token.length === 0) {
        response.status(500).json({"message" : "token not found"});
      }
        // If login is successful, data will contain the JWT token
        const token = data.token;
        console.log(token);
        // Saving the token to local storage or a cookie for subsequent requests
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        // Redirecting to the todo list page
        window.location.href = './Todo.html'; 
    })
    .catch(error => {
        
        console.error('Login error:', error);
        alert('Login failed. Please check your username and password.');
    });
});


//Signup

const baseUrl = 'http://localhost:3000'; 
const signupEndpoint = '/api/signup';

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username_signup').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password_signup').value;

  //POST request to the signup endpoint on your server
  fetch(baseUrl + signupEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, useremail: email, password })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Signup failed. Please try again later.');
    }
    return response.json();
  })
  .then(data => {
    
    alert(data.message);
    window.location.href = './index.html'; 
  })
  .catch(error => {
    
    console.error(error.message);
    alert(error.message);
  });
});