const express=require("express");
const cors=require("cors");
const bcrypt=require("bcrypt");
const connectDatabase = require("./config/db");
const User = require("./model/user.model");
const jwt=require("jsonwebtoken");
const auth = require("./middleware/authantication");
const Product = require("./model/prod.model");
require("dotenv").config();
const app=express();
app.use(cors());
app.use(express.json())

app.post("/signup",async (req,res)=>{
    let {fname,lname,dob,gender,country,email,password} =req.body;
    console.log(fname,email,password);
    const user=await User.findOne({email});
    if(!user){
        try{
            password = await bcrypt.hash(password, 4);
            let ndata={fname,lname,dob,gender,country,email,password}
            let ct=await User.create(ndata)
            res.send({
                data:"User Created Succesfully"
            })
        }catch(e){
            console.log(e);
            res.send("something not working");
        }
    }else{
        res.send({
            data:"User Already Exist With this Email Try Diffrent One"
        })
    }
})
app.post("/login",async (req,res)=>{
    let {email,password} =req.body;
    console.log(email,password);
    let user=await User.findOne({email});
    if(user){
        try{
            // console.log(user);
            const check = await bcrypt.compare(password, user.password);
            // console.log(check);
            if(check){
                user=user.toJSON();
                delete user.password;
                // console.log(user)
                const token=await jwt.sign(user,process.env.JWT_Key)
                // console.log(token);
                res.send({
                    data:"Sign in succesfull",
                    token
                })

            }else{
                res.send({
                    data:"your password is wrong"
                })
            }
            // let ndata={name,email,password}
            // let ct=await User.create(ndata)
            // res.send({
            //     data:"User Created Succesfully"
            // })
        }catch(e){
            console.log(e);
            res.send("something not working");
        }
    }else{
        res.send({
            data:"User Don't Exist With this Email Try Diffrent One"
        })
    }
})
app.post("/addtocart",auth,async (req,res)=>{
    console.log(req.user);
    // let {userId} =req.user;
    console.log({...req.body,userId:req.user});
    // res.send({msg:req.user})
    try {
        const k=await Product.create({...req.body,userId:req.user})
        res.send({
            nikeprod:k,
            msg:"added to the cart"
        })
        
    } catch (error) {
        res.send({error})
    }
})
app.get("/getfromcart",auth,async(req,res)=>{
    try {
        let prod=await Product.find({userId:req.user});
        res.send({
            nikeprod:prod
        })
        
    } catch (error) {
        res.status(500).send({error})
    }
})
app.get("/logout",auth,async(req,res)=>{
    try {
        let prod=await Product.deleteMany({userId:req.user})
        res.send({prod,msg:"Product deleted from cart"})
        
    } catch (error) {
        res.status(500).send({error})
    }
})
app.get("/profile",auth,async (req,res)=>{
    // const {userId}=req.user;
    try {
        let user=await User.findOne({_id:req.user})
        if(user){
            console.log(user);
            user=user.toJSON();
            delete user.password;
            res.send(user)
        }else{
            res.send("login again");
        }
        
    } catch (error) {
        res.status(500).send({error})
    }

})
app.get("/",(req,res)=>{
    res.send("hello wrold!")
})
const port=3001;
app.listen(port,async()=>{
    console.log("server started at http://127.0.0.1:3001");
    await connectDatabase()
})