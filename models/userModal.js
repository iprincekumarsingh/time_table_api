const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subject: [
        {
            type:String,
            required:false,

        }
    ],
    role: {
        type: String,
        default: "employee",
    },
    status: {
        type: String,
        default: "active",
    },

});

// hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});



userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
};


// checking the user status is ban or not 
userSchema.methods.isBan = async function () {

    return user.status === "ban" ? false : true;
};

// banning user if not
userSchema.methods.banuser = async function () {
    return user.status === "ban" ? true : false;
};

module.exports = mongoose.model("User", userSchema);
