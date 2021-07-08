
const UserModel = require('../models/UserModel');

// @desc new user
// @route GET /admin/user/add-user
// @access Private

exports.getUserForm = async (req, res, next) => {
    if(req.query.uid) {
        const userDetails = await UserModel.findById(req.query.uid)
            .select({ "name":1, "phone":1, "city":1 });
        res.render('adduser', userDetails);
    } else res.render('adduser');
};

// @desc Add user
// @route POST /admin/user/add-user
// @access Private

exports.addUser = async (req, res, next) => {
    try {

        if(req.query.uid) 
            await UserModel.findByIdAndUpdate(req.query.uid,req.body);
        else
            await UserModel.create(req.body);
        res.redirect('/admin/user/view-users');

    } catch (error) {

        let errorMsg = "Something went wrong!";

        // Mongoose duplicate key
        if (error.code === 11000)
            errorMsg = 'This Phone number has already taken.';
        
        // Mongoose validation error
        else if (error.name === 'ValidationError')
            errorMsg = Object.values(error.errors).map(val => val.message);
        
        res.render('adduser', { errorMsg });
    }
};

// @desc View user
// @route GET /admin/user/view-user
// @access Private

exports.viewUser = async (req, res) => {
    const userData = await UserModel.find({});
    res.render('viewusers',{userData});
};

// @desc Delete user
// @route GET /admin/user/delete-user
// @access Private

exports.deleteUser = async (req, res) => {
    await UserModel.findByIdAndRemove(req.query.uid);
    res.redirect('/admin/user/view-users');
};


//api

exports.apiUser = async (req, res) => {
    const userData = UserModel.find({});
    await res.json({data : userData});
};