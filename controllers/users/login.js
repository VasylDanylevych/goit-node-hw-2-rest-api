const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { userSchema } = require("../../schemas");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user.verify) {
        throw HttpError(401, "Verify your email address");
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    const payload = {
        id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(id, { token });

    res.json({
        token,
        user: {
            email: email,
            subscription: user.subscription,
        },
    });
};

module.exports = login;
