const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const authenticate = require('../middleware/authenticate');

router.get('/page/:page/user_id/:user_id', authenticate, addressController.getAllAddress);

router.post('/', authenticate, addressController.saveAddress );

router.get('/id/:id', authenticate, addressController.getaAddress);

router.delete('/:id/:image_name?', authenticate, addressController.deleteAddress);

router.put('/:id', authenticate, addressController.editAddress);

router.post('/upload/:id?', authenticate, addressController.uploadImage);

router.post('/cancle_image/:image_name/:id?', authenticate, addressController.cancleImage);

module.exports = router;