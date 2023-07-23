const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const baseUrl = 'http://localhost:3000'; 

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li= document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        li.id = Date.now().toString();
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        addListToDB(li.id, inputBox.value);
    }
    inputBox.value ='';
}

function addListToDB(id, content) {
    const token = localStorage.getItem('token'); 

    //POST request to the createlist endpoint on your server
    fetch(baseUrl + createListEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token, itemName: content, id: id })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create the task. Please try again later.');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data (e.g., show success message or refresh the task list)
            console.log(data.message);
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);