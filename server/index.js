const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const path = require('path');
const app = express();
const methodOverride = require("method-override")
const todo = require("../models/todo")
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelpcamp"
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.get("/todo", async(req, res) => {
  const allTodos = await todo.find({});
  res.json(allTodos);
})
app.post("/todo/create",async (req, res) => {
  const date = new Date(); 
  const newTodo = new todo({
       content: req.body.name,
       time: `${date.getHours()}:${date.getMinutes()}`,
       date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }) 
  await newTodo.save();
  console.log(newTodo)
  res.redirect("/")
})
app.post("/todo/edit/:id",async (req, res) => {
    const date = new Date(); 
    const {name} = req.body;
    const updateTodo = {
      content: name,
      time: `${date.getHours()}:${date.getMinutes()}`,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    const findTodo = await todo.findByIdAndUpdate(req.params.id,{...updateTodo});
    res.redirect("/")
})
app.delete("/todo/delete/:id", async (req, res) => {
   const deleteTodo = await todo.findByIdAndDelete(req.params.id);
   res.redirect("/")
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});