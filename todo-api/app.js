const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Todo } = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = await Todo.create({ text: req.body.text });
  res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    await todo.update(req.body);
    res.json(todo);
  } else {
    res.status(404).send();
  }
});

app.delete('/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    await todo.destroy();
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
