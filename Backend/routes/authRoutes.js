const express = require("express");
const { signupAdmin, loginAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

module.exports = router;