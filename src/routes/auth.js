const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async ( req, res) => {
    try{
        //Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password,about, skills, photoUrl} = req.body;
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            skills,
            photoUrl,
            about,
            password: passwordHash,
        });
        
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
            
            //Add the token to cookie and send the response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 36000000), //expires after 8 hours
            });

        res.json({message: "User added Successfully", data: savedUser});
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async(req, res) => {
    try{
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if(!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {    
            //Create a JWT Token
            const token = await user.getJWT();
            
            //Add the token to cookie and send the response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 36000000),
            });
            res.send(user);
        } else {
            throw new Error("Invalid credentials!");
        }
    }
    catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull");
});

module.exports = authRouter;