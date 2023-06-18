const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404);
    }

    res.json({ message: "Contact deleted" });
};

module.exports = deleteContactById;
