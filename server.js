const express = require('express');
const bodyParser = require('body-parser');
const addressroute = require('./api/routes/address');
const userroute = require('./api/routes/user');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/addresses', { useNewUrlParser: true });
const db = mongoose.connection;

var cors = require('cors');

db.on('error', (err) => {
    console.log(err);
} );

db.on('open', () => {
    console.log('Database connection Established');
} );

let app = express();
app.use(bodyParser.urlencoded( { extended:true } ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/address', addressroute);
app.use('/api/users', userroute);
const PORT = process.env.PORT || 4000;
app.listen(PORT);