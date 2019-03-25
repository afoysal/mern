const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const { serverError, resourceError } = require('../util/error');

const register = (req, res, next) => {
    let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword });

    if (!validate.isValid) {
        res.status(400).json(validate.error);
        res.json({ user });
    }
    else {
        User.findOne({ email })
          .then(user => {
            if (user) {
                return resourceError(res, 'Email Already Exist');
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }

                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });

                user
                    .save()
                    .then(user => {
                        res.status(201).json({
                            message: 'Registration Successful',
                            user
                        });
                    })
                    .catch(error => serverError(res, error));
            });
        })
        .catch(error => serverError(res, error));
    }
}

const allUsers = (req, res, next) => {
    User.find()
        .then(user => {
            res.status(201).json({
                message: "All Users",
                user
            } )
        } )
        .catch(err => {
            res.status(500).json({
                message: "Error Occured",
                error: err
            } )
        })
}

const login = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    User.findOne( { email } )
        .then( user => {
            if ( user ) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'Error Occured'
                        } )
                    }

                    if (result) {
                        let token = jwt.sign( { email: user.email, _id: user._id }, 'SECRET', { expiresIn: '2h' } )
                        res.status(200).json({
                            message: 'Login Successful',
                            token: `Bearer ${token}`
                        })
                    } else {

                        res.json({
                            message: 'Login failed'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'User not found'
                })
            }
        })

}

module.exports = { register, allUsers, login };