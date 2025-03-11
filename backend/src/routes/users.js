const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        wishlist: user.wishlist,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
router.post("/wishlist", protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      // Check if product is already in wishlist
      if (user.wishlist.includes(productId)) {
        res.status(400).json({ message: "Product already in wishlist" });
        return;
      }

      user.wishlist.push(productId);
      await user.save();
      res.json({ message: "Product added to wishlist" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
router.delete("/wishlist/:id", protect, async (req, res) => {
  try {
    const productId = req.params.id;
    const user = await User.findById(req.user._id);

    if (user) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      res.json({ message: "Product removed from wishlist" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
