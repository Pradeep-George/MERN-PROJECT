const express = require('express');

// Importing methods of user controller
const { getProductCatForm, addProductCat, deletePoductCat,viewProductCat } = require('../../controllers/ProductCatController.js');

const router = express.Router();

router.get('/add-productcat', getProductCatForm);
router.post('/add-productcat', addProductCat);
router.get('/delete-productcat', deletePoductCat);
router.get('/view-productcat', viewProductCat);

module.exports = router;