const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;

    const { page = 1, limit = 5, ...query } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find({ owner, ...query }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email");

    const total = await Contact.where({ owner, ...query }).countDocuments();
    const totalPage = Math.ceil(total / limit);
    if (page > totalPage) {
        throw HttpError(404);
    }

    res.json(result);
};

module.exports = getAllContacts;
