const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Welcome User!");
});

app.use("/hello", (req, res) => {
    res.send("Hello User!");
});

app.use("/work", (req, res) => {
    res.send("Working....");
});

app.listen(3000, () => {
    console.log("Server is running on 3000");
});