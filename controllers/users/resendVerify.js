const { User } = require("../../models");
const { userEmailSchema } = require("../../schemas");
const { BASE_URL } = process.env;
const { HttpError, sendEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
    const { error } = userEmailSchema.validate(req.body);
    if (error) throw HttpError(400, "missing required field email");

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401);
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success",
    });
};

module.exports = resendVerify;
