const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findOne({ _id: id }, "-createdAt -updatedAt").populate("owner", "email");
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
};

module.exports = getContactById;
