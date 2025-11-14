const express = require("express");
const app = express();
const { v4 } = require("uuid");
const { todo } = require("./data");
const { response, checkTodo, checkSub } = require("./middlewares");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(response);

app.get("/", (req, res) => {
  res.send(`<h1>TodoList</h1>`);
});

app.get("/todos", (req, res) => {
  res.success(todo);
});

app.get("/todos/:todoId", (req, res) => {
  const { title } = req.body;

  if (title) {
    res.json(todo.filter((v) => v.title == title));
  }
  res.status(404).json(`An error occurred`);
});

app.post("/todos", checkTodo, (req, res) => {
  const { title, description, status, createdAt, dueDate, updatedAt } =
    req.body;
  todo.push({
    id: v4(),
    title,
    description,
    status,
    dueDate,
    createdAt,
    updatedAt,
    subtask: [],
  });
  if (
    !title ||
    !description ||
    !status ||
    !dueDate ||
    !createdAt ||
    !updatedAt
  ) {
    res.status(404).json(`Wrong`);
    return;
  }
  res.success(`todo successfully posted`);
});

app.put("/todos/:todoId", checkTodo, (req, res) => {
  const { todoId } = req.params;
  const findId = todo.find((v) => v.id == todoId);
  const { title, description, status, createdAt, dueDate, updatedAt } =
    req.body;
  if (!todoId) {
    res.status(404).json(`Wrong`);
    return;
  }

  findId.title = title || findId.title;
  findId.description = description || findId.description;
  findId.status = status || findId.status;
  findId.dueDate = dueDate || findId.dueDate;
  findId.createdAt = createdAt || findId.createdAt;
  findId.updatedAt = updatedAt || findId.updatedAt;

  res.success(`todo successfully modified`);
});

app.delete("/todos/:todoId", (req, res) => {
  const { todoId } = req.params;

  // 존재하는지
  const exists = todo.some((v) => v.id === todoId);
  if (!exists) {
    return res.status(404).json(`Todo not found`);
  }
  const newTodos = todo.filter((v) => v.id != todoId);

  // 배열 변경
  todo.length = 0;
  todo.push(...newTodos);

  res.success(`todo successfully deleted`);
});

/* SubTasks */

app.get("/todos/:todoId/subtasks", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;
  if (title) {
    res.json(subtask.filter((v) => v.title == title));
    res.success("Loaded subtasks");
    return;
  }

  const newTodo = todo.find((v) => v.id === todoId);
  if (!newTodo) {
    return res.status(404).json("Subtask not found");
  }
  res.status(404).json(`An error occurred`);
});

app.post("/todos/:todoId/subtasks", checkSub, (req, res) => {
  const { todoId } = req.params;
  const { title, status, createdAt, updatedAt } = req.body;
  if (!title || !status || !createdAt || !updatedAt) {
    return res.status(404).json(`Wrong`);
  }
  const newTodo = todo.find((v) => v.id === todoId);
  if (!newTodo) {
    return res.status(404).json("Subtask not found");
  }
  const todoSubtask = {
    id: todoId,
    todoId: v4(),
    title,
    status,
    createdAt,
    updatedAt,
  };
  newTodo.subtask.push(todoSubtask);
  res.success(`subtask successfully posted`);
});

app.put("/subtasks/:subtaskId", checkSub, (req, res) => {
  const { subtaskId } = req.params;
  const findId = todo.find((v) => v.id == subtaskId);
  const { title, status, createdAt, updatedAt } = req.body;
  if (!subtaskId) {
    res.status(404).json(`Wrong`);
    return;
  }

  findId.title = title || findId.title;
  findId.status = status || findId.status;
  findId.createdAt = createdAt || findId.createdAt;
  findId.updatedAt = updatedAt || findId.updatedAt;

  res.success(`todo successfully modified`);
});

app.delete("/subtasks/:subtaskId", (req, res) => {
  const { subtaskId } = req.params;

  const exists = subtask.some((v) => v.id === subtaskId);
  if (!exists) {
    return res.status(404).json(`Todo not found`);
  }
  const newSubtask = subtask.filter((v) => v.id != subtaskId);

  // 배열 변경
  todo.subtask.length = 0;
  todo.subtask.push(...newTodos);

  res.success(`todo successfully deleted`);
});

/* done */
app.listen(3001, () => {
  console.log("running");
});
