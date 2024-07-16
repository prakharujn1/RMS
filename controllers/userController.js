const userModal = require("../models/userModel");
const bcrypt = require('bcrypt');

// login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModal.findOne({ userId, verified: true });
    
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).send(user);
      } else {
        res.status(401).json({ message: "Login Failed: Invalid Password" });
        console.log("password");
      }
    } else {
      res.status(401).json({ message: "Login Failed: User not found or not verified" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// register user
const registerController = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModal({ ...rest, password: hashedPassword, verified: true });
    await newUser.save();
    res.status(201).send("New user added successfully!");
  } catch (error) {
    res.status(400).send("Error", error);
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerController,
};
