require('./models/user');
require('./models/userData');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const app = express();
const userDataRoutes = require('./routes/userDataRoutes');

app.use(bodyParser.json());
app.use(authRoutes);
app.use(userDataRoutes);

const mongoUri = 'mongodb+srv://Tanmay:Tanmay3610@cluster0.g9wmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongoose');
})

mongoose.connection.on('error', err => {
    console.error('Error connecting to mongoose', err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})