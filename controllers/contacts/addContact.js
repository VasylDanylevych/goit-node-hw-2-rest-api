const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const { contactAddSchema } = require("../../schemas");

const addContact = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing required name field");
    }

    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

module.exports = addContact;
