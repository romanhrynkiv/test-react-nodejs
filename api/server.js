const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const [createUser, getUsers, editUser, deleteUser] = require('./controllers/user.controller');
const path = require("path");
const app = express()
const port = 8080;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const mongoURI = 'mongodb://localhost:27017/testReactNodeJs';

app.post('/api/users', upload.single('avatar'), createUser);
app.get('/api/users', getUsers);
app.put('/api/user/:id', upload.single('avatar'), editUser);
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
