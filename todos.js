const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {Todo} = require('./models/todo');
mongoose.connect('mongodb://donBerezza:Berezza98@ds119436.mlab.com:19436/todos', { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/todos', async (req, res) => {
    try{
        const todo = new Todo({
            title : req.body.title,
            status : req.body.status
        });
        await todo.save();
        res.send('created !!!');
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Server Error');
    }
});

app.get('/todos', async (req, res) => {
    try{
        let todos = await Todo.find();
        res.send(todos);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Server Error');
    }
});

app.get('/todos/:id', async (req, res) => {
    try{
        let todo = await Todo.find({_id : req.params.id});
        res.send(todo);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Server Error');
    }
});

app.put('/todos', async (req, res) => {
    try{
        console.log(req.body);
        await Todo.update({_id : req.body._id}, {title : req.body.title, status : req.body.status});
        res.send("edited !!!");
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Server Error');
    }
});

app.delete('/todos/:id', async (req, res) => {
    try{
        await Todo.deleteOne({_id : req.params.id});
        res.send('deleted !!!')
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Server Error');
    }
});

app.use((req, res) => {
    res.status(404);
    res.send('NOT FOUND');
});

app.listen(8080, () => {
    console.log("PORT", 8080);
});

