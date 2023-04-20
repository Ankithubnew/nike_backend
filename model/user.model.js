const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    dob:String,
    country:String,
    gender:String,

})
const User=mongoose.model("User",userSchema);
module.exports=User;
// email:"",
//     password:"",
//     fname:"",
//     lname:"",
//     dob:"",
//     country:"",
//     gender:""