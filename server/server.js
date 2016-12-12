var express=require('express');
var app=express();

var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');


require('./schema/model');
var mongoose=require('mongoose');
var utils=require('./utils/md5');
var user=require('./route/user');
var article=require('./route/article');
var users=mongoose.model('User');
var articles=mongoose.model('Article');
app.use(express.static(__dirname));
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json());
app.use("*",function(req,res,next){
    next();
});
app.use('/user',user);
app.use('/article',article);
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('broke');
    next();
});

app.get('/', function(req, res) {
    users.find({},function(err,docs){
        if(err){
            console.log('err:',err);
            return;
        }
        res.jsonp(docs);
    });
});
app.listen('3600',function(){
    console.log('server start')
});