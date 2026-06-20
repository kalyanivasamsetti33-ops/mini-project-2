const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async(req,res)=>{

try{

const {name,email,password}=req.body;

const exist = await User.findOne({email});

if(exist){
return res.json({message:"User already exists"});
}


const hashPassword = await bcrypt.hash(password,10);


const user = await User.create({
name,
email,
password:hashPassword
});


res.json({
message:"Register success",
user
});


}catch(error){
res.json({error:error.message});
}

}



exports.login = async(req,res)=>{

try{

const {email,password}=req.body;

const user = await User.findOne({email});

if(!user){
return res.json({message:"User not found"});
}


const match = await bcrypt.compare(password,user.password);


if(!match){
return res.json({message:"Wrong password"});
}


const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET
);


res.json({
message:"Login success",
token
});


}catch(error){

res.json({error:error.message});

}

}