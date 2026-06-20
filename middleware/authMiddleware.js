const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next)=>{


const token = req.headers.authorization;


if(!token){
return res.json({message:"No token"});
}


try{

const verify = jwt.verify(
token,
process.env.JWT_SECRET
);

req.user = verify;

next();


}catch(error){

res.json({message:"Invalid token"});

}


}


module.exports = authMiddleware;