const Joi = require("joi");
const { emailRegexp, minPasswordLength, subscriptionType } = require("../constants");

const userSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(minPasswordLength).required(),
});

const userUpdateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionType)
        .required(),
});

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
    userSchema,
    userUpdateSubscriptionSchema,
    userEmailSchema,
};
