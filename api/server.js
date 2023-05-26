const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user');
const [createUser, getUsers, editUser, deleteUser] = require('./controllers/user.controller');
const app = express()
const port = 8080;

app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/testReactNodeJs';

app.post('/api/users', createUser);
app.get('/api/users', getUsers);
app.put('/api/user/:id', editUser);
app.delete('/api/user/:id', deleteUser);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(port, () => {
    console.log(`Server started! Port: ${port}`)
})
