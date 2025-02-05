const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const auth = "xyz";
    const adminAuth = auth === "xyz";
    if (!adminAuth) {
        res.status(401).send("Not Authorized");
    }else{
        next();
    }
};

module.exports = {adminAuth};