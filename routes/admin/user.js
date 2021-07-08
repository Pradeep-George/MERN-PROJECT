const express = require('express');

// Importing methods of user controller
const { addUser, deleteUser, getUserForm, viewUser, apiUser } = require('../../controllers/UserController');

const router = express.Router();

router.get('/add-user', getUserForm);
router.post('/add-user', addUser);
router.get('/delete-user', deleteUser);
router.get('/view-users', viewUser);
router.get('/apiusers', apiUser);

module.exports = router;