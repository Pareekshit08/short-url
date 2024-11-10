
async function validateLogin(req,res){
    var cookie = req.cookies?.uid;
    if(!cookie){
        console.log("Cookie not found!!!");
        res.render("AdminLogin",{error:""});
    }else{
        if(cookie == "random"){
            res.render("Admin");
        }else{
            console.log("Wrong Cookie!!!");
            res.render("AdminLogin",{error:""});;
        }
    }
}

async function adminlogin(req,res){
    var body = req.body;
    console.log("reached");
    console.log(body);
    const Username = "admin";
    const Password = "admin123";
    if(body.Username == Username && body.Password == Password){
        res.cookie("uid","random");
        res.render("Admin");
    }
    else {
        res.render("AdminLogin",{error:"Invalid Credentials"});
    }
};

module.exports = {
    adminlogin,validateLogin
}