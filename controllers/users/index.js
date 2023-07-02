const { ctrlWrapper } = require("../../decorators");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateStatusSubscription = require("./updateStatusSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateStatusSubscription: ctrlWrapper(updateStatusSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};
