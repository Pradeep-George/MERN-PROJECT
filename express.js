var express = require('express');
var bodyParser = require('body-parser');
var strings = require('./config/common');
var session =require('express-session');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var app = express();
var sess = {
    secret: 'foodieappkey',
    cookie: {}
  };
  app.use(session(sess));


// set pug as template
app.set("views","./views");
app.set("view engine","pug");

app.use(express.static('public'));


// app.get('/',function(req,res){
//     res.render('dashboard');
// });

app.get('/',function(req,res){

    if(req.session.login==1)
        {
            res.redirect('/home');
        }
        else
        {
            res.render('login');
        }
    
    });
   
    app.get('/logout',function(req,res){

        req.session.destroy();

        res.redirect('/');
        
        });

app.get('/home',function(req,res){

    if(req.session.login==1)
    {
        var username=req.session.user;

        res.render('dashboard', { username: username})
        
        
    }
    else
    {
        res.redirect('/');
    }
        }); 

app.post('/loginsub',urlencodedParser,function(req,res){

        var user=req.body.user;
        var pass=req.body.pass;
        if(user=='admin' && pass=='password')
        {
            req.session.login=1;
            req.session.user=user;
            req.session.password=pass;
            res.redirect('/home');
        }
        else
        {
            res.redirect('/');
        }
        
        });



var server = app.listen(strings.mystrings.myport,function(){
    console.log('server is running on '+strings.mystrings.myport);
});