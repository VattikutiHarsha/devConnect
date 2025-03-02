const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        console.log("Cookies received in backend:", req.cookies);

        const user = req.user;
        
        res.status(200).json(user);
    }catch(err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
    console.log("Request Body:", req.body);
    
    try {
        if(!validateEditProfileData(req.body)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {
            if (loggedInUser[key] !== undefined) {
                loggedInUser[key] = req.body[key];
            }  
        });

        await loggedInUser.save();

        res.status(200).json({message: `${loggedInUser.firstName}, Your profile updated successfully`,
        data: loggedInUser,
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profileRouter;