const express = require('express');
const bodyParser = require('body-parser');
const addressroute = require('./api/routes/address');
const userroute = require('./api/routes/user');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/addresses', { useNewUrlParser: true });
const db = mongoose.connection;
const passport = require('passport');

var cors = require('cors');

const http = require('http');
const path = require('path');
const fs = require('fs');


let app = express();
//const httpServer = http.createServer(app);
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
//app.get("/", express.static(path.join(__dirname, "./public")));

db.on('error', (err) => {
    console.log(err);
} );

db.on('open', () =>  {
    console.log('Database connection Established');
} );

app.use(passport.initialize());
require('./passport')(passport);


app.use('/uploads/', express.static('uploads/'));


app.use(bodyParser.urlencoded( { extended:true } ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/address', addressroute);
app.use('/api/users', userroute);
const PORT = process.env.PORT || 4000;
app.listen(PORT);