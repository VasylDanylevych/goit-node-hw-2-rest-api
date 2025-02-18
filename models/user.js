const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const { emailRegexp, minPasswordLength } = require("../constants");
const { subscriptionType } = require("../constants");

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for user"],
            minlength: minPasswordLength,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: emailRegexp,
        },
        subscription: {
            type: String,
            enum: subscriptionType,
            default: subscriptionType[0],
        },
        token: String,
        avatarURL: String,
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
