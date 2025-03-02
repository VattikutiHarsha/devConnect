const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateEditProfileData = (data) => {
    const allowedEditFields = ["firstName", "lastName", "gender", "age", "skills", "photoUrl", "about"];

    //Allows only the fields method by checking keys
    const isEditAllowed = Object.keys(data).every((field) => allowedEditFields.includes(field));

    if (!isEditAllowed) {
        throw new Error("Invalid fields in edit request");
    }

    if (data.skills && !Array.isArray(data.skills)) {
        throw new Error("Skills must be an array");
    }

    return true;
};

module.exports = { validateSignUpData, validateEditProfileData };