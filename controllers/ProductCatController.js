
const ProductCatModel = require('../models/ProductCategory');

exports.getProductCatForm = async (req, res, next) => {
    if(req.query.uid) {
        const productCatDetails = await ProductCatModel.findById(req.query.uid)
            .select({ "name":1, "description":1, "image":1 });
        res.render('addproductcat', productCatDetails);
    } else res.render('addproductcat');
};

exports.addProductCat = async (req, res, next) => {
    try {

        if(req.query.uid) 
            await ProductCatModel.findByIdAndUpdate(req.query.uid,req.body);
        else
            await ProductCatModel.create(req.body);
        res.redirect('/admin/productcat/view-productcat');

    } catch (error) {

        let errorMsg = "Something went wrong!";

        // Mongoose duplicate key
        if (error.code === 11000)
            errorMsg = 'This Name has already taken.';
        
        // Mongoose validation error
        else if (error.name === 'ValidationError')
            errorMsg = Object.values(error.errors).map(val => val.message);
        
        res.render('addproductcat', { errorMsg });
    }
};

exports.viewProductCat = async (req, res) => {
    const productCatDetails = await ProductCatModel.find({});
    res.render('viewproductcat',{productCatDetails});
};

exports.deletePoductCat= async (req, res) => {
    await ProductCatModel.findByIdAndRemove(req.query.uid);
    res.redirect('/admin/productcat/view-productcat');

};
