const express=require("express");
require("dotenv").config();
console.log(process.env.Mongo_Url);
const mongoose=require("mongoose");
async function connectDatabase(){
    await mongoose.connect(process.env.Mongo_Url)
    console.log("Db connected");
}
module.exports=connectDatabase;