const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(username, email, password)

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Hash the password
        // 

        // Create a new user
        const createuser = new User({
          username: username,
            email: email,
            password: password
        });

        await createuser.save();

        // Send a success response
        res.status(201).json({
            message: "User Created successfully",
            user: {
                _id: createuser._id,
                username: createuser.username,
                email: createuser.email
            }
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({ email });

    console.log(user.password)
    // Check if the user exists
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the password
    // const isMatch = await bcryptjs.compare(password, user.password);

    // Check if the password is correct
    // if (!isMatch) {
    //     return res.status(400).json({ message: "Invalid username or password" });
    // }

    // If user exists and password matches, send success response
    res.status(200).json({
        message: "Login successfully",
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    });
} catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
}
});

module.exports = router;
