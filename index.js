const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors()); // --> this will allow to take request from any browser or frontend who calls this backend'
const port = 3000;
// let todos = [];

function findIndex(arr,id){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].id === id){
            return i;
        }
    }
    return -1;
}

function removeAtIndex(arr, index){
    let newArray = [];
    for(let i = 0; i < arr.length; i++){
        if(i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get('/todos', (req, res) => {
    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err) throw err;
        res.json(JSON.parse(data));
    });

    // res.json(todos); //-->simple approach
});

app.get('/todos/:id' , (req, res) => {

    fs.readFile("todos.json","utf8", (err,data) => {
        if(err) throw err;
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt (req.params.id));
        if(todoIndex === -1){
            res.status(404).send();
        }else{
            res.json(todos[todoIndex]);
        }
    });
});

app.post('/todos' ,(req, res) => {
    const newTodo = {
        id: Math.floor(Math.random()*1000000),
        title: req.body.title,
        description: req.body.description
    };
    fs.readFile("todos.json","utf8",(err,data) => {
        if(err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);

        fs.writeFile("todos.json",JSON.stringify(todos), (err) => {
            if(err) throw err;
            res.status(201).json(newTodo);
        });

    });
    
    // res.status(201).json(newTodo); 
});

app.put('/todos/:id', (req,res) => {
    fs.readFile("todos.json","utf-8",(err,data) => {
        if(err) throw err;
        let todos =JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.params.id));
        if(todoIndex === -1){
            res.status(404).send();
        }else{
            todos[todoIndex].title = req.body.title;
            todos[todoIndex].description = req.body.description;
        }
        fs.writeFile("todos.json", JSON.stringify(todos),(err) => {
            if(err) throw err;
            res.status(201).json(todos[todoIndex]);
        });
    });
});

app.delete('/todos/:id', (req,res) => {

    fs.readFile("todos.json","utf-8", (err,data) => {
        if(err) throw err;
        let todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.params.id));
        if(todoIndex === -1){
            res.status(404).send();
        }else{
            todos = removeAtIndex(todos, todoIndex);
        }
        fs.writeFile("todos.json" ,JSON.stringify(todos),(err) => {
            if(err) throw err;
            res.status(201).send();
        });
    });
});
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname , "index.html"));
})

app.use((req, res, next) => {
    res.status(404).send();
})

app.listen(3000,() => console.log(`started at ${port}`));
// module.exports = app;
