const express = require('express');

// Importing methods of user controller
const { getProductForm,addProduct,deletePoduct,viewProduct } = require('../../controllers/ProductController.js');

const router = express.Router();

router.get('/add-product', getProductForm);
router.post('/add-product', addProduct);
router.get('/delete-product', deletePoduct);
router.get('/view-product', viewProduct);


module.exports = router;