const { ctrlWrapper } = require("../../decorators");

const addContact = require("./addContact");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const deleteContactById = require("./deleteContactById");

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContactById: ctrlWrapper(deleteContactById),
};
