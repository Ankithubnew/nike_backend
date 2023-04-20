const jwt=require("jsonwebtoken")
require("dotenv").config();
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    console.log(token);
    const user=jwt.verify(token,process.env.JWT_Key)
    console.log(user);
    console.log(user._id);
    if(user){
        req.user=user._id;
        next();
    }else{
        res.send("please login again")
    }

}
module.exports=auth;