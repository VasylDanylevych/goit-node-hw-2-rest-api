const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { userUpdateSubscriptionSchema } = require("../../schemas");

const updateStatusSubscription = async (req, res) => {
    const { error } = userUpdateSubscriptionSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing field subscription");
    }
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = updateStatusSubscription;
