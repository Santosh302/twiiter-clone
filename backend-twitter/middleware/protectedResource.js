const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if Authorization header exists
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "User not logged in" });
    }

    // Extract token

    const token = authorization.replace("Bearer ", "");

    // Verify token

    const payload = jwt.verify(token, JWT_SECRET);

    // Check if payload contains _id

    if (!payload || !payload._id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find user by _id

    const dbUser = await UserModel.findById(payload._id);

    // Check if user exists

    if (!dbUser) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user object to the request

    req.user = dbUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Authentication failed" });
  }
};
