const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const minPasswordLength = 6;
const subscriptionType = ["starter", "pro", "business"];

module.exports = {
    emailRegexp,
    minPasswordLength,
    subscriptionType,
};
