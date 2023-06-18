const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { userSchema } = require("../../schemas");

const register = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

module.exports = register;
