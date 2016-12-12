var mongoose=require('mongoose');
var url='mongodb://localhost/justForYou';
mongoose.connect(url);

//user模块
mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String,isRequired:true},
    list:{type:Object,default:[]},
    avatar:{type:String,default:'http://www.qdaily.com/images/missing_face.png'}
}));


//article模块
mongoose.model('Article',new mongoose.Schema({
    title:{type:String,isRequired:true},
    content:{type:String,isRequired:true},
    createAt:{type:String,isRequired:true},
    pv:{type:Number,default:0},
    user:{type:Object,ref:'User'},
    username:{type:String,isRequired:true},
    star:{type:Array,default:[]},
    comments:[{
        user:{type:Object,ref:'User'},  //评论人
        content:{type:String},  //评论的内容
        createAt:{type:String,isRequired:true}  //评论的时间
    }]
}));

global.Model=function(modelName){
    return mongoose.model(modelName);
};


