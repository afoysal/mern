const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    address: {
        type: String,
        trim: true,
        //required: true,
        //minlength: 3
    },
    telephone_no: {
        type: String,
        trim: true,
        //required: true,
        //minlength: 3
    },
    email: {
        type: String,
        trim: true,
        //required: true,
        //minlength: 3,
        unique: true
    },
    image: {
        type: String,
        trim: true,
        //required: true,
        //minlength: 3
    },
});
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;