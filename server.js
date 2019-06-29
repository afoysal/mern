const express = require('express');
const bodyParser = require('body-parser');
const addressroute = require('./api/routes/address');
const userroute = require('./api/routes/user');
const mongoose = require('mongoose');
const db = require('./api/config/keys').mongoURI;
const passport = require('passport');
var cors = require('cors');
const path = require('path');
let app = express();

mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb://localhost/addresses', { useNewUrlParser: true });

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected....'))
    .catch((err) => console.log(err));

app.use(passport.initialize());
require('./passport')(passport);
app.use('/uploads/', express.static('uploads/'));
app.use(bodyParser.urlencoded( { extended:true } ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/address', addressroute);
app.use('/api/users', userroute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', ( req, res ) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT);