const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const baseUrl = 'http://localhost:3000/api/v1/tasks';
const createListEndpoint = '/api/createlist';
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        li.id = Date.now().toString();
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        addListToDB(inputBox.value);
    }
    inputBox.value = '';
}

function addListToDB(content) {
    const token = localStorage.getItem('token');

    //POST request to the createlist endpoint on your server
    fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },
        body: JSON.stringify({task: content})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create the task. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if (e.target.tagName === "SPAN") {
        deleteFromDB(e.target.parentElement.id);
        e.target.parentElement.remove();
    }
}, false);

function deleteFromDB(id) {
    // const content = document.getElementById(id).textContent;
    let content = document.getElementById(id).textContent;

    content = content.substring(0, content.length - 1);


    const token = localStorage.getItem('token');

    fetch(baseUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ task: content})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete the task. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
}

function load() {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage


    if(!token){
        window.location.href = './index.html';
        return;
    }

    fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },
    })
    .then(response => response.json())
    
    .then(data => {
            // console.log(data.result);
            data.result.forEach(element => {
                let li = document.createElement("li");
                li.innerHTML = element.content;
                listContainer.appendChild(li);
                li.id = element.task_ID;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
            })
    })
    .catch(error => {
        console.error('Error : ' + error);
    });
}

load();