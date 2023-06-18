const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const { contactAddSchema } = require("../../schemas");

const updateContactById = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = updateContactById;
