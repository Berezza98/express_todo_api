const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title : String,
    status : { type : String, default : "not done"}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};