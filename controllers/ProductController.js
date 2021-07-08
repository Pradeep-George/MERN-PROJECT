
const ProductModel = require('../models/Product');
const ProductCatModel = require('../models/ProductCategory');

exports.getProductForm = async (req, res, next) => {
    const productCatDetails = await ProductCatModel.find();
    if (req.query.uid) {
        const productDetails = await ProductModel.findById(req.query.uid)
            .select({ "name": 1, "description": 1, "cat_id": 1, "stock": 1, "status": 1, "price": 1, 'image': 1 });
        console.log(productDetails);
        res.render('addproduct', { productDetails, productCatDetails });
    } else {
        res.render('addproduct', { productCatDetails, productDetails: {} });
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        
        if (req.query.uid) {
            await ProductModel.findByIdAndUpdate(req.query.uid, req.body);
            console.log("update");
        }
        else {
            await ProductModel.create(req.body);
            console.log("create");
        }
        res.redirect('/admin/product/view-product');

    } catch (error) {
        const productCatDetails = await ProductCatModel.find(); 
        let errorMsg = "Something went wrong!";

        // Mongoose duplicate key
        if (error.code === 11000)
            errorMsg = 'This Name has already taken.';

        // Mongoose validation error
        else if (error.name === 'ValidationError')
            errorMsg = Object.values(error.errors).map(val => val.message);

        res.render('addproduct', { errorMsg, productDetails: {}, productCatDetails});
    }
};

exports.viewProduct = async (req, res) => {
    const productDetails = await ProductModel.find();
    const productCatDetails = await ProductCatModel.find();
    res.render('viewproduct', { productCatDetails, productDetails });
};

exports.deletePoduct = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.query.uid);
    res.redirect('/admin/product/view-product');

};

exports.viewProductApi = async (req, res) => {
    const productDetails = await ProductModel.find();
    const productCatDetails = await ProductCatModel.find();
    res.send({"Procat" : productCatDetails, "prodetails" : productDetails });
};
