const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const authenticate = require('../middleware/authenticate');
//const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function ( req, file, cb ) {
//         cb( null, './uploads/' );
//     },
//     filename: function ( req, file, cb ) {
//         cb( null, Date.now()+ '-'+file.originalname );
//     }
// });

// const fileFilter = ( req, file, cb ) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
//         cb( null, true );
//     } else {
//         cb( new Error('Try to upload .jpeg or .png file.'), false );
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

// upload(req, res, function (err) {
//     if (err) {
//         console.log(err);
//     }
//     console.log('file uploaded successfully');
// });

router.get( '/page/:page', addressController.getAllAddress);

router.post( '/', addressController.saveAddress );

router.get( '/id/:id', addressController.getaAddress);

router.delete( '/:id/:image_name?', addressController.deleteAddress);

router.put( '/:id', addressController.editAddress);

router.post( '/upload/:id?', addressController.uploadImage);

router.post( '/cancle_image/:image_name/:id?', addressController.cancleImage);

module.exports = router;