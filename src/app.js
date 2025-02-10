const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async ( req, res) => {
    try{
        //Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //Creating a new instance of User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        
        await user.save();
        res.send("User added Successfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/login", async(req, res) => {
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
            res.cookie("token", token);
            res.send("Login Successful!");
        } else {
            throw new Error("Invalid credentials!");
        }
    }
    catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user;
        
        res.send(user);
    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

connectDB().then(() => {
    console.log("Database Connected");
    app.listen(3000, () => {
        console.log("Server is running on 3000");
    });
}).catch(err => {
    console.error("Database is not connected");
});