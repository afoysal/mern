const mongoose = require('mongoose');
const valid = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 3,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;