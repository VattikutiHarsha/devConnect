const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB().then(() => {
    console.log("Database Connected");
    app.listen(3000, () => {
        console.log("Server is running on 3000");
    });
}).catch(err => {
    console.error("Database is not connected");
});