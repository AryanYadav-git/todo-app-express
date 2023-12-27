function deleteTodo(id) {
    fetch(`http://localhost:3000/todos/${id}` ,{
        method: "DELETE"
    }).then((resp) => {
        getData();
        if(resp.ok){
            alert("deleted");
        }
        else{
            alert("failed");
        }
    });
}

function todosCallback(data){
    var parentElement = document.getElementById("mainArea");
    parentElement.innerHTML = "";
    data.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todoBox");
        const titleElement = document.createElement('h2');
        titleElement.textContent = todo.title;
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = todo.description;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click',function(){deleteTodo(todo.id)});
        
        todoDiv.appendChild(titleElement);
        todoDiv.appendChild(descriptionElement);
        todoDiv.appendChild(deleteButton);

        parentElement.appendChild(todoDiv);
    });
    // parentElement.innerHTML = JSON.stringify(data);
    console.log(data);
}

function getDataCallback(resp){
    resp.json().then(todosCallback);
}

function getData(){
    fetch("http://localhost:3000/todos" , {
        method:"GET"
    }).then(getDataCallback);
}

getData();

function parsedResponse(data){
    console.log(data);
}
function callback(resp){
    resp.json().then(parsedResponse);
}
function onPress(){
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    fetch("http://localhost:3000/todos",{
        method:"POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(callback)
    // fetch("http://localhost:3000/todos",{
    //     method:"GET"
    // }).then(callback)
}