const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async ( req, res) => {
    //Creating a new instance of User model
    const user = new User(req.body);

    await user.save();
    res.send("User added Successfully");
});

//Get User from DB
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({ emailId: userEmail });
        if(users.length===0){
            res.status(404).send("user not found");
        } else {
            res.send(users);
        }
    } catch {
        res.status(400).send("Something went wrong");
    }
});

app.get("/feed", async( req, res ) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.delete("/user", async( req, res ) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/user", async( req, res ) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id: userId}, data);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
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