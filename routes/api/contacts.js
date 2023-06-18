const express = require("express");

const router = express.Router();

const { contactsControllers } = require("../../controllers");

const { isValidId, authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsControllers.getAllContacts);

router.get("/:id", isValidId, contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.delete("/:id", isValidId, contactsControllers.deleteContactById);

router.put("/:id", isValidId, contactsControllers.updateContactById);

router.patch("/:id/favorite", isValidId, contactsControllers.updateStatusContact);

module.exports = router;
