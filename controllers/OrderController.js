
const OrderModel = require('../models/OrderModel');

// @desc single order
// @route GET /admin/user/add-user
// @access Private

exports.singleOrder = async (req, res, next) => {
    if(req.query.order_id) {
        const orderDetails = await OrderModel.findById(req.query.order_id)
            .select({ "reference":1, "customer_name":1,"total":1,"address_delivery":1,"address_invoice":1, "created_at":1,"products":1 });
        res.render('singleorder', orderDetails);
    } 
   // else res.render('adduser');
};



// @desc View Order
// @route GET /admin/order/view-order
// @access Private

exports.viewOrder = async (req, res) => {
    const orderData = await OrderModel.find({});
    res.render('vieworders',{orderData});
};