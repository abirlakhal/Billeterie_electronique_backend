const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        phone: {
            type: String,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minLength: 6,
            trim: true
        },
        picture:{
            type: String,
            default:"./uploads/profil/random.png"
        },
        institute:{
            type: String,
            trim: true
        },
        numC:{
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;