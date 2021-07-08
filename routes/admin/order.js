const express = require('express');

// Importing methods of user controller
const { viewOrder,singleOrder } = require('../../controllers/OrderController');

const router = express.Router();


router.get('/view-orders', viewOrder);
router.get('/single-order', singleOrder);


module.exports = router;