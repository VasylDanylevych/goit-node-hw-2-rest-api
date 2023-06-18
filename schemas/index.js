const { contactAddSchema, contactUpdateFavoriteSchema } = require("./contactsJoi");
const { userSchema, userUpdateSubscriptionSchema } = require("./usersJoi");

module.exports = {
    contactAddSchema,
    contactUpdateFavoriteSchema,
    userSchema,
    userUpdateSubscriptionSchema,
};
