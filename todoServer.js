const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

var todos = [];

app.get("/todos", (req, res) => {
  if (todos.length === 0) {
    res.status(404).json("No todos found");
  } else {
    res.status(200).json(todos);
  }
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= todos.length) {
    res.status(404).json("Todo not found");
  } else {
    const todo = todos[id - 1];
    res.json(todo);
  }
});

app.post("/todos", (req, res) => {
  var todo_item = req.body;
  todos.push(todo_item);
  res.status(201).json(todos[todos.length - 1]);
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo_item = req.body;
  if (todos[id]) {
    todos[id] = todo_item;
    res.status(200).json("Todo updated successfully");
  } else {
    res.status(404).json("Todo not found");
  }
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= todos.length) {
    res.status(404).json("Todo not found");
  } else {
    todos.splice(id, 1);
    res.status(200).json("Todo deleted successfully");
  }
});

function started() {
  console.log("Server started on port 3000");
}

app.listen(3000, started);
//module.exports = app;
