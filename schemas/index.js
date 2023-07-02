const { contactAddSchema, contactUpdateFavoriteSchema } = require("./contactsJoi");
const { userSchema, userUpdateSubscriptionSchema, userEmailSchema } = require("./usersJoi");

module.exports = {
    contactAddSchema,
    contactUpdateFavoriteSchema,
    userSchema,
    userUpdateSubscriptionSchema,
    userEmailSchema,
};
