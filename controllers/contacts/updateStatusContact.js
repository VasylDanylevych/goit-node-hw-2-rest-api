const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");
const { contactUpdateFavoriteSchema } = require("../../schemas");

const updateStatusContact = async (req, res) => {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = updateStatusContact;
