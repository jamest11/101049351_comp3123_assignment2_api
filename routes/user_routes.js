const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const routes = express.Router()

const responseMsg = (status, message) => { return { status, message } };

routes.post("/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
    
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).send(err);
    }

});
    
routes.post("/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = null;

        if (!password || !(username || password)) {
            return res.status(400).json(responseMsg(false, 'Username/email and password required'));
        } else if(username) {
            user = await User.findOne({ username });
        } else {
            user = await User.findOne({ email });
        }
    
        if (user && password == user.password) {
            const token =  jwt.sign({ user: user._id }, process.env.TOKEN_KEY, { expiresIn: '2h', });
    
            const response = {
                status: true,
                username: user.username,
                email: user.email,
                message: 'User logged in successfully',
                jwt_token: token
            };

            return res.status(200).json(response);
        } 
        return res.status(400).json(responseMsg(false, 'Invalid username/password'));

    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});
  
module.exports = routes