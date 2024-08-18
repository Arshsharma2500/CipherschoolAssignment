const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//create-account
const registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashPassword});
        await user.save();
        res.status(201).json({message: 'User registered successfully'});

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};



//login-user
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isUser = await bcrypt.compare(password, user.password);
        if(!isUser) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {
    registerUser,
    loginUser
}