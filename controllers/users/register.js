const bcrypt = require("bcrypt");
const saltRounds = 10;
const { nanoid } = require("nanoid");

const gravatar = require("gravatar");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { userSchema } = require("../../schemas");
const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "identicon" });

    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
        },
    });
};

module.exports = register;
