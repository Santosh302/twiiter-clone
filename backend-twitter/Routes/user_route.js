const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const UserModel = mongoose.model("UserModel");  
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const protectedRoute = require('../middleware/protectedResource')


//This is API Register User data in Database

const bcrypt = require('bcrypt');

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if any required fields are empty

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Check if the user already exists

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the Database

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the user with the given email

      const user = await UserModel.findOne({ email });

      // Check if the user exists and the password matches

      if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const jwtToken = jwt.sign({_id: user._id}, JWT_SECRET);
            const userInfo = {"email": user.email, "fullName": user.fullName};
              res.json({ message: {token: jwtToken, userInfo}});
          } else {
              res.status(401).json({ message: 'Invalid credentials' });
          }
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Update user bio in database

router.put("/updateBio",protectedRoute, (req, res) => {
  console.log(req.body);
  const { userName, bio, profileImage } = req.body;

  const userId = req.user.id; // Assuming you have authentication middleware setting user information

  // Find the user by userId and update the bio and profileImage
  
  UserModel.findByIdAndUpdate(
    userId,
    { $set: { userName, bio, profileImage } },
    { new: true } // To return the updated document
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user: updatedUser });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});



// Assuming you have a route like this in your server

router.get('/getUser/:userId',protectedRoute, async (req, res) => {
  try {
    const userId = req.params.userId; // Extract the user ID from the request parameters

    // Fetch the user data from the database based on the user ID
    
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;