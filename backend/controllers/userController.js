const User = require("../models/userModel");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

// ✅ GET ALL USERS (with pagination)
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ✅ GET SINGLE USER
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// ✅ SEARCH USERS
const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { firstName: { $regex: q, $options: "i" } },
        { lastName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ],
    };

    const total = await User.countDocuments(searchQuery);
    const users = await User.find(searchQuery).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ✅ CREATE USER
const createUser = async (req, res, next) => {
  try {
    const profileImage = req.file ? req.file.filename : "";
    const user = await User.create({ ...req.body, profileImage });
    res.status(201).json({ success: true, message: "User created successfully", data: user });
  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete old image if new one uploaded
    if (req.file && existingUser.profileImage) {
      const oldPath = path.join(__dirname, "../uploads", existingUser.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const profileImage = req.file ? req.file.filename : existingUser.profileImage;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profileImage },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete profile image from disk
    if (user.profileImage) {
      const imgPath = path.join(__dirname, "../uploads", user.profileImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ EXPORT TO CSV
const exportToCSV = async (req, res, next) => {
  try {
    const users = await User.find().lean();

    const fields = ["firstName", "lastName", "email", "mobile", "gender", "status", "location", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("users.csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    user.status = req.body.status;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Status updated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getUsers,
  getUserById,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
  exportToCSV,
  toggleStatus,   
};

