const express = require('express');
const User = require('../model/userModel')

const createUser = async(req, res) => {
    try {
        const {email, password, profile} = req.body;

        if(!email || !password) return res.status(400).send({message : "require details"});
        const findUser = await User.findOne({email});
        if(findUser) return res.status(400).send({message : "email already exists"});
        const newUser = new User({
            email,
            password : btoa(password),
            profile : profile || "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
        })

        if(!newUser) return  res.status(400).send({message : "error while creating user"});
        newUser.save();
        return res.status(201).send({message : "user created successfully", data : newUser});
    } catch (error) {
        return res.status(400).send({message : error});
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(400).send({message : "require details"});
        const findUser = await User.findOne({email})
        if(!findUser) return res.status(400).send({message : "user not found"});
    
        if(atob(findUser.password) === password) return res.status(201).send({message : "successfully logged in", data : findUser});
        return res.status(400).send({message : "wrong credentials"});

        
    } catch (error) {
        return res.status(400).send({message : error});
    }
}


module.exports = {createUser, loginUser}