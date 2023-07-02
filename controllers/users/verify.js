const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, "User not found");
    }

    const { _id: id } = user;

    await User.findByIdAndUpdate(id, { verify: true, verificationToken: null });

    res.json({
        message: "Verification successful",
    });
};

module.exports = verify;
