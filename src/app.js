const express = require("express");

const app = express();

const {adminAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
    res.send("All data sent");
});

app.delete("/admin/deleteAllData", (req, res, next) => {
    res.send("deleted user");
});

app.listen(3000, () => {
    console.log("Server is running on 3000");
});