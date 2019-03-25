const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');

router.get('/', addressController.getAllAddress);

router.post( '/', addressController.saveAddress );

router.get('/:id', addressController.getaAddress);

router.delete('/:id', addressController.deleteAddress);

router.put('/:id', addressController.editAddress);

module.exports = router;