const express = require("express");
const {  connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const bodyParser = require("body-parser");
const staticroute = require('./routes/staticroute');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth');
const Admin = require('./AdminRoute/admin');

 
const app = express();
const PORT = 3000;
const shortid = require("shortid");

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("mongo connected");
}).catch((err)=>{
    console.log(err);
    console.log("could not connect to mongo");
});

app.set("view engine","ejs");
app.use(express.static( __dirname +'/public'));

app.use(bodyParser.json());
// app.use('/url',urlRoute);
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/',checkAuth,staticroute);
app.use('/user',userRoute);

app.use('/url/check',restrictToLoggedinUserOnly);

//due to problem in body parser
app.post("/url/check",async (req,res)=>{
    const body = req.body;
    console.log(body);
    if(!body.link){;
         return res.status(400).json({error:'url is required'})
        };
const shortId = shortid();
console.log(shortId);
const checking = async()=>{
   const findurl = await URL.findOne({createdBy:req.user._id,redirectURL:body.link,});
   if(findurl){
    return true;
   }else{
    return false;
   }
}
if(await checking()){
   res.send("url already present") ;
}
else{
    await URL.create({
        shortId:shortId,
        redirectURL:body.link,
        visitHistory:[],
        createdBy:req.user._id
    }).then(()=>{
        console.log("shortid inserted in database");
    }).catch((err)=>{
        console.log("nope shortid not inserted");
    });
    const ar = await URL.find({createdBy:req.user._id});
    return res.render("index",{id:shortId,cust_arr:ar});
}

});

app.post("/url/check/custom",async (req,res)=>{
    const body = req.body;
    console.log(body);
    if(!body.link){;
         return res.status(400).json({error:'url is required'})
        };
const shortId = body.Cust_name;
console.log(shortId);
const checking = async()=>{
   const findurl = await URL.findOne({createdBy:req.user._id,redirectURL:body.link,});
   if(findurl){
    return true;
   }else{
    return false;
   }
}
if(await checking()){
   res.send("url already present") ;
}
else{
    await URL.create({
        shortId:shortId,
        redirectURL:body.link,
        visitHistory:[],
        createdBy:req.user._id
    }).then(()=>{
        console.log("shortid inserted in database");
    }).catch((err)=>{
        console.log("nope shortid not inserted");
    });
    const ar = await URL.find({createdBy:req.user._id});
    return res.render("index",{id:shortId,cust_arr:ar});
}

});

app.get('/analytics/:shortId',async (req,res)=>{
const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{visitHistory:{timestamp:Date.now()}}})
res.redirect(entry.redirectURL);
});

//admin
app.use("/admin",Admin);


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});