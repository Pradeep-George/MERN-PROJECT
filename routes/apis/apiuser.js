const express = require('express');
var app = express();

// Importing methods of user controller
var apiUsers = require('../../controllers/UserController');
const router = express.Router();

//router.get('/apis/apiuser',apiUsers);

module.exports = router