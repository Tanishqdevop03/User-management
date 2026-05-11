const express = require("express");
const protect = require("../middleware/authmiddleware");
const { addUser, getUsers, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", protect, addUser);
router.get("/getuser",protect, getUsers);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;