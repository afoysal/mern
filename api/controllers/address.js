//const Address = require('./../models/Address');
const path = require('path');
const Address = require(__dirname + './../models/Address');
const multer = require('multer');
const fs = require('fs');
const { serverError, resourceError } = require('../util/error');

const getAllAddress = (req, res, next) => {
    var perPage = 10;
    var page = parseInt(req.params.page) || 1;
    var user_id = req.params.user_id;

    Address
    .find({ owner: user_id })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({ _id: -1 })
    .exec((error, addresses) => {
        if (error) return next(error);
        Address.countDocuments().exec((err, count) => {
            if (err) return next(err);
            res.status(200).json({
                message: "All Addresses",
                addresses,
                page,
                maxPages: Math.ceil(count / perPage)
            })
        })
    })
}

const saveAddress = (req, res, next) => {
    const address = new Address(req.body);
    address.save()
    .then(address => {
        res.status(200).json({
            message: 'Address Saved',
            address
        });
    })
    .catch(err => {
        const errString = err.toString();
        if (errString.includes("E11000")) return res.status(404).json({ err: 'That email is already in use!' });
    });
}

const getaAddress = (req, res, next) => {
    let id = req.params.id;
    Address.findById(id)
    .then(address => {
        res.status(200).json({
            message: "A Address",
            address
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error Occured",
            error: err
        })
    })
}

const deleteAddress = (req, res, next) => {
    Address.findByIdAndRemove(req.params.id)
        .then(result => {
        if (req.params.image_name) {
            fs.unlink(path.join('uploads/' + req.params.image_name), err => {
                if (err) {
                    res.send({ status: 200 });
                } else {
                    res.status(200).json({
                        message: 'Address Deleted',
                        result
                    });
                }
            });
        }
        else {
            res.status(200).json({
                message: 'Address Deleted',
                result
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error Occured',
            error: error
        });
    });
}

const editAddress = (req, res, next) => {
    let id = req.params.id;

    Address.findByIdAndUpdate(id, { $set: req.body } )
    .then(result => {
        Address.findById(id)
            .then(address => {
                res.status(200).json({
                    message: "Address Updated",
                    address
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "Error Occured",
                    error: err
                })
            })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error Occured",
            error: err
        })
    })
}

const uploadImage = (req, res, next) => {
    let user_id = req.params.id;

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            return cb(new Error('Try to upload .jpeg or .png file.'), false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024
        },
        fileFilter: fileFilter
    }).single('addressImage');

    upload(req, res, function(error) {
        if (error) {
            return res.status(404).json({ err: (error.toString()).replace('Error:', '').replace('Multer', '') });
        } else {
            if (req.file.filename === res.req.res.req.file.filename) {
                if (user_id !== '') {
                    let image = { image: req.file.filename };
                    Address.findByIdAndUpdate(user_id, { $set: image })
                    .then(() => {
                        res.status(200).json({
                            message: 'File uploaded',
                            file: req.file.filename
                        });
                    })
                    .catch(() => {
                        res.send({ status: 500 });
                    })
                }
                else {
                    res.status(200).json({
                        message: 'File uploaded',
                        file: req.file.filename
                    });
                }
            }
        }
    });
}

const cancleImage = ( req, res, next ) => {
    let fileName = req.params.image_name;
    let user_id = req.params.id;

    fs.unlink(path.join('uploads/' + fileName), err => {
        if (err) {
            //console.log(err);
            res.send({ status: 200 });
        } else {
            if (user_id) {
                let image = { image: '' };
                Address.findByIdAndUpdate(user_id, { $set: image })
                .then( () => {
                    res.send({ status: 200 });
                })
                .catch( () => {
                    res.send({ status: 500 });
                })
            }
            else {
                res.send( { status: 200 } );
            }
        }
    });
};

module.exports = {
    getAllAddress,
    saveAddress,
    getaAddress,
    deleteAddress,
    editAddress,
    uploadImage,
    cancleImage
};