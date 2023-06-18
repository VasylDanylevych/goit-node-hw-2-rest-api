const express = require("express");

const router = express.Router();

const { usersControllers } = require("../../controllers");

const { authenticate } = require("../../middlewares");

router.post("/register", usersControllers.register);

router.post("/login", usersControllers.login);

router.get("/current", authenticate, usersControllers.getCurrent);

router.post("/logout", authenticate, usersControllers.logout);

router.patch("/subscription", authenticate, usersControllers.updateStatusSubscription);

module.exports = router;
