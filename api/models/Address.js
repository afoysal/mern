const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const valid = require('validator');

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
    },
    telephone_no: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    image: {
        type: String,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;