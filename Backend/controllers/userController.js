const { findOne } = require("../models/Admin");
const User = require("../models/User");

const addUser = async (req,res) => {
    try{
        const { fullName, email, role, status, location, phone} = req.body;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({
                message : "User Exist",
            });
        }
        const user = await User.create({
            fullName,
            email,
            role,
            status,
            location,
            phone,
            createdBy: req.admin.id,
        });

        res.status(201).json(user);
    }catch (error) {
        res.status(500).json({
            message : error.message,
        });
    }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ createdBy: req.admin.id });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};