const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    console.log(body);
    if(!body.link){;
         return res.status(400).json({error:'url is required'})
        };
const shortId = shortid();
console.log(shortId);
await URL.create({
    shortId:shortId,
    redirectURL:body.link,
    visitHistory:[]
}).then(()=>{
    console.log("shortid inserted in database");
}).catch((err)=>{
    console.log("nope shortid not inserted");
});

return res.json({id:shortId});

};

module.exports = {
    handleGenerateNewShortURL
};