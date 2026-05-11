const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generatetoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"5d",
    });
};

const signupAdmin = async (req,res) => {
    try{
        const {email,password} = req.body;

        const AdminExist = await Admin.findOne({email});

        if(AdminExist){
            return res.status(400).json({
                message:"User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "Admin registered successfully",
            token: generatetoken(admin._id),
        });
    }catch (error){
        res.status(500).json({
           message: error.message,
        });
    }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generatetoken(admin._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signupAdmin,
  loginAdmin,
};
