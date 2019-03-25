const Address = require('../models/Address');

const getAllAddress = (req, res, next) => {
    Address.find()
        .then(addresses => {
            res.status(200).json({
                message: "All Addresses",
                addresses
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

const saveAddress = (req, res, next) => {
    const address = new Address({
        name: req.body.name,
        address: req.body.address,
        telephone_no: req.body.telephone_no,
        image: req.body.image,
        email: req.body.email
    });

    address.save()
        .then(address => {
            res.status(200).json({
                message: "Address Saved",
                address
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error Occured",
                error: err
            });
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
    let id = req.params.id;
    Address.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: "Address Deleted",
                result
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

const editAddress = (req, res, next) => {
    let id = req.params.id;

    let updatedAddress = {
        name: req.body.name,
        address: req.body.address,
        telephone_no: req.body.telephone_no,
        image: req.body.image,
        email: req.body.email
    };

    Address.findByIdAndUpdate(id, { $set: updatedAddress } )
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
module.exports = { getAllAddress, saveAddress, getaAddress, deleteAddress, editAddress };