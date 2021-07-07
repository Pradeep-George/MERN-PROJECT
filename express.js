var express = require('express');
var bodyParser = require('body-parser');
var strings = require('./config/common');
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var sess = {
    secret: 'foodieappkey',
    cookie: {}
};
app.use(session(sess));
app.use(express.urlencoded( { extended: true } ));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));
app.use(express.json());

//load env variables
const dotenv = require('dotenv');
dotenv.config( {path:'./config/config.env'} );

//connect to database
const connectDB = require('./config/db');
connectDB();

//Importing route files
const userRouter = require('./routes/admin/user');
const productcatRouter = require('./routes/admin/productCategory');
const productRouter = require('./routes/admin/product');
const orderRouter = require('./routes/admin/order');

const userApi = require('./routes/apis/apiuser');


// Mounting Routes
app.use('/admin/user',userRouter);
app.use('/admin/productcat',productcatRouter);
app.use('/admin/product',productRouter);
app.use('/admin/order',orderRouter);

//app.use('/apis/apiuser', userApi);





app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});


// app.get('/newuser1', function (req, res) {

//         res.render('adduser');
    

// });

app.get('/', function (req, res) {

    if (req.session.login == 1) {
        res.redirect('/home');
    }
    else {
        res.render('login');
    }

});

app.get('/logout', function (req, res) {

    req.session.destroy();

    res.redirect('/');

});
app.get('/viewuser', function (req, res) {

    res.render('viewusers');

});
app.get('/home', function (req, res) {

    if (req.session.login == 1) {
        var username = req.session.user;

        res.render('dashboard', { username: username })


    }
    else {
        res.redirect('/');
    }
});

app.post('/loginsub', urlencodedParser, function (req, res) {

    var user = req.body.user;
    var pass = req.body.pass;
    if (user == 'admin' && pass == 'password') {
        req.session.login = 1;
        req.session.user = user;
        req.session.password = pass;
        res.redirect('/home');
    }
    else {
        res.redirect('/');
    }

});

// app.get('/apiusers', function (req, res) {

//     res.send(userApi);

// });


var server = app.listen(strings.mystrings.myport, function () {
    console.log('server is running on ' + strings.mystrings.myport);
});
