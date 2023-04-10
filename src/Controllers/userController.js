const user = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (req,res)=>{
    
    const {username,email,password} = req.body;
    
    try {

        //check wheater user is exist or not 
        const exist = await user.findOne({email : email});

        if(exist){
            res.status(404).json({message : "user is already exists"});
        }

        // generating password hash
        const hashedPassword = await bcrypt.hash(password,10);

        //create user to mongoDB
        const result = await user.create({
            username : username,email : email, password : hashedPassword
        });

        //generate token 
        const token = jsonwebtoken.sign({email : result.email,id : result._id},SECRET_KEY);

        //sending response to user
        res.status(201).json({user : result,token : token});


    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
    
}


const login = async(req,res)=>{
    const {username,email,password} = req.body;

    try {
        
        const exist = await user.findOne({email : email});
        
        if(!exist){
            return res.status(404).json({message : "user not found"});
        }

        const matchPass = await bcrypt.compare(password,exist.password);

        if(!matchPass){
            return res.status(400).json({message : "invalid password"});
        }
        
        const token = jsonwebtoken.sign({email : exist.email, id : exist._id},SECRET_KEY);
        res.status(200).json({user : exist , token : token});


    } catch (error) {
        res.status(500).json({message : "something went wrong"});
    }
   
}

module.exports = {signUp,login}
